const fastify = require('fastify')();

const fs = require('fs');

const {coinCount, valueFromArray, valueFromCoinObject, validDenomination} = require('./p3-module.js');

fastify.get('/', (request, reply) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        reply
        .code(500);
      }
      reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(data);
    });
});

fastify.get('/coin', (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    let coinValue = coinCount({denom: parseInt(denom), count: parseInt(count)});
    console.log(coinValue)
    reply
    .header("Content-Type", "text/html; charset=utf-8")
    .status(200)
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`)
});

fastify.get('/coins', (request, reply) => {
    const {option} = request.query;
    let coinValue = 0

    switch(option){
        case '1':
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            reply
            .code(200)
            .header('Content-Type', 'text/html; charset=utf-8')
            .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
            break;
        case '2':
            const coins = [
                { denom: 25, count: 2 },
                { denom: 1, count: 7 },
            ];
            coinValue = coinCount(...coins);
            reply
            .code(200)
            .header('Content-Type', 'text/html; charset=utf-8')
            .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
            break;       
    };
    // default wasn't working on switch for some reason so I used this for invalid options
    if ( option !== '1' && option !== '2' ){
      reply
      .code(200)
      .header('Content-Type', 'text/html; charset=utf-8')
      .send(`<h2>Option ${option} value is 0</h2><br /><a href="/">Home</a>`);
    };
});


const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

