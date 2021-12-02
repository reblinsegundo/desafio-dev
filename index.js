const express = require('express');
const axios = require('axios');

const app = express();

app.get("/api/numbers", async (req, res) => {
    let start = Date.now();
    console.log('GET /api/numbers');
    var numbers = await getNumbers();
    console.log('Request completed | Duration: ' + ((Date.now() - start)/1000) + 's');
    res.send(numbers);
})

app.listen(8000, () => {
    console.log('Starting server')
})

async function getNumbers(){
    var numbers = [];
    var data = [];
    var page = 1;

    for(let i = 0; i < page; i++){
        try {
            let response = await axios.get('http://challenge.dienekes.com.br/api/numbers?page=' + page);
            data = response.data.numbers;
            numbers = numbers.concat(data);
            console.log(page);
            if(data.length > 0){
                page++;
            }else{
                console.log('Total pages: ' + page)
            }
        } catch (error) {
            console.log('Error request');
            try {
                let response = await axios.get('http://challenge.dienekes.com.br/api/numbers?page=' + page);
                data = response.data.numbers;
                numbers = numbers.concat(data);
                console.log(page);
                if(data.length > 0){
                    page++;
                }
            } catch (error) {
                console.log('Error request 2');
            }    
        }
    }
    return sortNumbers(numbers);
}

//bubble sort
function sortNumbers(numbers){
    let length = numbers.length;  
    for (let i = 0; i < length; i++) { 
          for (let j = 0; j < (length - i - 1); j++) { 
            if(numbers[j] > numbers[j+1]) {
                let aux = numbers[j]; 
                numbers[j] = numbers[j+1]; 
                numbers[j+1] = aux; 
            }
        }        
    }
    return numbers;
}