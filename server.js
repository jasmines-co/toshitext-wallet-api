require('dotenv').config()
const express = require('express')
const app = express()
const rp = require('request-promise')
const bitcoin = require('bitcoinjs-lib')
const tx = new bitcoin.Transaction()
const bigi    = require("bigi");
const buffer  = require('buffer');
const keys    = new bitcoin.ECPair(bigi.fromHex(my_hex_private_key));
const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse
const port = process.env.PORT || 8080

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
    const url = 'https://api.blockcypher.com/v1/btc/main/addrs/1KU3pVsK3TkQJugDpc5rV5ZnWQ4jXJoqef/balance'
    var options = {
        method: 'GET',
        uri: url
    }
    rp(options)
    .then(results => {
        console.log(results)
        res.send(results)
    })
    .catch(err => {
        console.log('There was an error getting the address balance -> ', err)
    })
})

// Get address balance
app.get('/getBalance', (req, res) => {
    const twiml = new MessagingResponse()
    const url = `https://api.blockcypher.com/v1/btc/main/addrs/1J6VVu3b3NYT89na7XqCoCn5ryEUmNxWF5/balance`
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
        // res.send(results.addresses[0])
        console.log(results)
        balance = results["total_received"]
        twiml.message(balance)
        res.writeHead(200, {'Content-Type': 'text/xml'})
        res.end(twiml.toString())
    })
    .catch(err => {
        console.log('There was an error getting the address details -> ', err)
    })
})

// Create a transaction
app.post('/sendTransaction', (req, res) => {
    const twiml = new MessagingResponse()
    const url = `https://api.blockcypher.com/v1/bcy/test/txs/new`

    // const newtx = {
    //     inputs: [{addresses: ['C9J68jbN3HFRXusdrSdE7LaMvxwrK2SJXL']}],
    //     outputs: [{addresses: ['C7i1ZTScBv2MUr4V6qTmBMJDjeRVxGxphu'], value: 100000}]
    // }

    var options = {
        uri: url,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        body: {
            inputs: [{addresses: ['C9J68jbN3HFRXusdrSdE7LaMvxwrK2SJXL']}],
            outputs: [{addresses: ['C7i1ZTScBv2MUr4V6qTmBMJDjeRVxGxphu'], value: 100000}]
        },
        json: true // Automatically parses the JSON string in the response
    }
    
    rp(options)
    .then(tempTx => {
        console.log(temptx)
        tmpTx.pubkeys = []
        tmpTx.signatures = tmpTx.tosign.map((tosign, n) => {
            tmpTx.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
            return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
        })

        rp('https://api.blockcypher.com/v1/bcy/test/txs/send')
        .then(finalTx => {
            console.log(finalTx)
        })
        .catch(err => {
            console.log('There was an error sending the transaction -> ', err)
        })

        const sendTx = {
            tx: {},
            tosign: [
                ""
            ],
            signatures: [
                ""
            ],
            pubkeys: [
                ""
            ]
        }

        // TODO: add senTx transaction Object
        rp('https://api.blockcypher.com/v1/bcy/test/txs/send')
        .then(receipt => {
            console.log(receipt)
        })
        .catch(err => {
            console.log('There was an error with the signed transaction. -> ', err)
        })


    })
    .catch(err => {
        console.log('There was an error sending the transaction -> ', err)
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