require('dotenv').config()
const express = require('express')
const app = express()
const rp = require('request-promise')
const bitcoin = require('bitcoinjs-lib')
tx = new bitcoin.Transaction()
const port = 5000 || process.env.PORT

app.get('/', (req, res) => {
    res.send('Toshitext Wallet Managet NodeJS')
})

app.post('/wallets', (req, res) => {
        const url = `https://api.blockcypher.com/v1/btc/main/wallets?token=${process.env.TOKEN}`
        var options = {
            method: 'POST',
            uri: url,
            body: {
                some: {
                    "name": "fode",
                    "addresses": ["1J6VVu3b3NYT89na7XqCoCn5ryEUmNxWF5"]}
            },
            json: true // Automatically stringifies the body to JSON
        }
        rp(options)
        .then(results => {
            console.log(results)
            res.send(results)
        })
        .catch(err => {
            console.log('Error -> ', err)
        })
})

app.post('/addressGeneration', (req, res) => {
    const url = 'http://api.blockcypher.com/v1/btc/test3/addrs'
    var options = {
        method: 'POST',
        uri: url
    }
    rp(options)
    .then(results => {
        console.log(results)
        res.send(results)
    })
    .catch(err => {
        console.log('Error -> ', err)
    })
})

app.get('/addressDetails', (req, res) => {
    const url = `https://api.blockcypher.com/v1/btc/main/wallets`
    var options = {
        uri: url,
        qs: {
            token: process.env.TOKEN // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    
    rp(options)
    .then(results => {
        console.log(results)
        res.send(results)
    })
    .catch(err => {
        console.log('Error -> ', err)
    })
})
    
app.get('/results', (req, res) => {
   const url = 'https://api.blockcypher.com/v1/btc/main' 
    rp(url)
    .then(body => {
        const data = JSON.parse(body)
        res.send(`name is ${data.name} and hash ${data.hash}`)
        res.json(data)
    })
    .catch(err => {
        console.log('Error -> ', err)
    })
})

app.listen(port, () => {
    console.log('Server has started on port: ', port )
})