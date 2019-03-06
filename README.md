## Toshitext Wallet API powered by BlockCypher
[BlockCypher.com](https://www.blockcypher.com/)

## Documentation vAlpha
[https://jasmines-co.github.io/toshitext-wallet-api/#/](https://jasmines-co.github.io/toshitext-wallet-api/#/)

### Specifications
This wallet api by default mirrors the BlockCypher api. We want to make it easy to send BTC over SMS. Our main offering is a SMSWallet service which would allow anyone to send a little bit of BTC over a text message.

### Instructions
We have a web frontend for anybody to signup and get approved to send and recieve value on our network. PASTE_LINK_TO_FRONTEND

## Tech Stack
+ Twilio
+ BlockCypher
+ Heroku
+ Docker
+ kubernetes

## Endpoints 
### `/createWallet`
The ` create ` command should create a new wallet named after the account name of the owner. With KYC we need to know the identity of wallet holders. The user will also need to provide at least one known public BTC address at the time of creation.

### `/generateAddress`
The `new address ` command should create a new address under the wallet associated with that unique user. A wallet can hold multiple addresses.

### `/getBalance`
Getting the balance of an address is a cheap call to associated api endpoint.

### `/createTransaction`
`createTransaction()` encasulates a series of steps taken to construct, sign, and broadcast a BTC transaction to the network to validate. 

## Docker Instructions

### The fastest way to launch all services
``` $ docker-compose up ```

### To launch in background
```$ docker-compose up -d```

## To rebuild the image
```$ docker-compose up --build```

### To stop containers
```$ docker-compose down```

### To get a list of containers for docker-composex
run ```$ docker-compose ps ``` from the same directory as docker-compose.yml 

 