require('dotenv').config()
const express = require('express')
const app = express()
const rp = require('request-promise')
const bitcoin = require('bitcoinjs-lib')
const tx = new bitcoin.Transaction()
const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    const url = 'https://api.blockcypher.com/v1/btc/main' 
     rp(url)
     .then(body => {
         const data = JSON.parse(body)
         res.json(data)
     })
     .catch(err => {
         console.log('Error -> ', err)
     })
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
            console.log('There was an error getting the wallets -> ', err)
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
        console.log('There was an error generating the wallet address -> ', err)
    })
})

app.get('/balance', (req, res) => {
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
        console.log('There was an error generating the wallet address -> ', err)
    })
})

app.post('/depositAddress', (req, res) => {
    const twiml = new MessagingResponse()
    const url = `https://api.blockcypher.com/v1/btc/main/wallets/sukhrob/addresses`
    var options = {
        uri: url,
        qs: {
            token: process.env.TOKEN // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Content-Type': 'text/xml'
        },
        json: true // Automatically parses the JSON string in the response
    };
    
    rp(options)
    .then(results => {
        console.log(results)
        // res.send(results.addresses[0])
        text = results.addresses[0]
        twiml.message(text)
        res.end(twiml.toString())
    })
    .catch(err => {
        console.log('There was an error getting the address details -> ', err)
    })
})

// Twilio test
app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse()

    twiml.message("All your bitcoins are belong to us 😁")

    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
})

app.listen(port, () => {
    console.log('Server has started on port: ', port )
})