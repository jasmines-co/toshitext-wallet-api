const express = require('express')
const app = express()
const rp = require('request-promise')
const port = 3000
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('search')
})

app.get('/results', (req, res) => {
//  res.send('It works!')
   const query = req.query.search
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