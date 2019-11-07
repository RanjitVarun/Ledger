var PORT = process.env.PORT || 3001;
console.log(PORT);
var express = require('express');
var app = express();
var Ledger = require('ledger-cli').Ledger;
const JSONStream = require('JSONStream');
var cors=require('cors');

app.use(express.static('client'))
app.use(cors());
var ledger = new Ledger({file: 'data/file.dat',
binary:'/usr/bin/ledger',
command:null
},{
  Cli:{command:'ledger -f file.dat'}
});
//console.log(ledger);
var fs = require('fs');
var http = require('http');
var server = http.Server(app);



ledger.accounts()
  .on('data', function(account) {
//console.log(account);
  });

  app.get('/account',(req,res)=>{
   
ledger.accounts()
.pipe(JSONStream.stringify())
.pipe(res)

.once('error', (error) => {
  res.status(500).send({error: error.message});
});

  })


app.get('/balance',(req,res)=>{

  ledger.balance()
    .pipe(JSONStream.stringify())
    .pipe(res)
    .once('error', (error) => {
  
      res.status(500).send({error: error.message});
    });
  })

app.get('/register',(req,res)=>{


  ledger.register()
    .pipe(JSONStream.stringify())
    .pipe(res)
    .once('error', (error) => {
      res.status(500).send({error: error.message});
    });
  })

  
server.listen(PORT, function () {
  console.log('server running');
});













