var PORT = process.env.PORT || 3001;
console.log(PORT);
var express = require('express');
var app = express();
var Ledger = require('ledger-cli').Ledger;
const JSONStream = require('JSONStream');
var cors = require('cors');
var bodyparser = require('body-parser');
var fs = require('fs');
var http = require('http');
var server = http.Server(app);
const axios = require('axios');
var autoincrement = require('autoincrement');
autoincrement == (autoincrement + 1);
var prependFile = require('prepend-file');
const ledgermongo = require('./Models/ledgerschema');
const formula = require('./Models/formulaschema');
const connect = require('./DB/Dbconnect');
const PDFDocument = require('pdfkit');
const cmd=require('node-cmd');
const replace = require('replace-in-file');
const async_hooks = require('async_hooks');




// var ledger = new Ledger({
//   file: 'data/test.dat',
//   binary: '/usr/bin/ledger',
//   command: null
// }, {
//   Cli: { command: 'ledger -f file.dat' }
// });


app.use(bodyparser.json({ limit: '15mb' }));
app.use(express.static('client'))
app.use(cors());


// prependFile('test.dat', ';' + autoincrement + '(Assets+liabilities)' + '\n', function (err) {
//   if (err) {
//   console.log(err)
//   }
//   console.log('The "data to prepend" was prepended to file!');
// });


app.get('/account', (req, res) => {
  var ledger = new Ledger({
    file: 'data/file.dat',
    binary: '/usr/bin/ledger',
    command: null
  }, {
    Cli: { command: 'ledger -f file.dat' }
  });
  ledger.accounts()
    .pipe(JSONStream.stringify())
    .pipe(res)
    .once('error', (error) => {
      res.status(500).send({ error: error.message });
    });
})


app.get('/balance/:file', (req, res) => {
  var param=req.params;

  var ledger = new Ledger({
    file: 'data/'+param.file+'.dat',
    binary: '/usr/bin/ledger',
    command: null
  }, {
    Cli: { command: 'ledger -f file.dat' }
  });
  ledger.balance()
    .pipe(JSONStream.stringify())
    .pipe(res)
    .once('error', (error) => {
    res.status(500).send({ error: error.message });
    });
})


app.get('/register/:file', (req, res) => {
  var param=req.params;

  var ledger = new Ledger({
    file: 'data/'+param.file+'.dat',
    binary: '/usr/bin/ledger',
    command: null
  }, {
    Cli: { command: 'ledger -f file.dat' }
  });
  
  ledger.register()
    .pipe(JSONStream.stringify())
    .pipe(res)
    .once('error', (error) => {
    res.status(500).send({ error: error.message });
    });
})


app.get('/postings', (req, res) => {
  var ledger = new Ledger({
    file: 'data/file.dat',
    binary: '/usr/bin/ledger',
    command: null
  }, {
    Cli: { command: 'ledger -f file.dat' }
  });
  ledger.stats(function (err, stats) {
    if (err) { return console.error(err); }
    else {//console.log(stats)
    }
    res.send(stats)
  });
})


// app.get('/tostring', (req, res) => {
//   var entry = null;
//   axios.get('http://www.mocky.io/v2/5dde0dcc2f00002e697eac84').then(resp => {
//     entry = resp.data;
//     var payee;
//     var date = entry.date;
//     entry.cleared === true ? payee = `* ${entry.payee}` : payee = `${entry.payee}`;
//     entry.pending === true ? payee = `! ${entry.payee}` : payee = `${entry.payee}`;
//     var jsonData = `${date} ${payee}\n`
//     for (posting of entry.postings) {
//       jsonData += `  ${posting.account}           ${posting.commodity.formatted}\n`
//     }
//     console.log(jsonData);
//     res.send(jsonData);
//   });
// });


app.post('/form', (req, res) => {
  var entry = {
    date: req.body.formDetails.date,
    effectiveDate: req.body.formDetails.effectiveDate,
    code: '10',
    cleared: false,
    pending: false,
    payee: req.body.formDetails.payee,
    Postings:
      [{ account: req.body.formDetails.Postingaccount1, commodity: { currency: '$', amount: req.body.formDetails.Commodityamount1, formatted: '$ '+req.body.formDetails.Commodityamount1}},
    { account: req.body.formDetails.Postingaccount2, commodity: { currency: '$', amount: req.body.formDetails.Commodityamount2, formatted: '$ '+req.body.formDetails.Commodityamount2} },
      ]
  }
  connect.then(db => {
    let ledgertomongo = new ledgermongo(entry);
    ledgertomongo.save().then(reg => {
    res.status(200).json(result).send('updated successfully');
    })
    .catch(err => { res.status(400).send("failed to post") });
  })
  //console.log(entry);
  var payee;
    var date = entry.date;
    entry.cleared === true ? payee = `* ${entry.payee}` : payee = `${entry.payee}`;
    entry.pending === true ? payee = `! ${entry.payee}` : payee = `${entry.payee}`;
    var jsonData = `${date} ${payee}\n`
    for (posting of entry.Postings) {
      jsonData += `  ${posting.account}           ${posting.commodity.formatted}\n`
    }
    console.log(jsonData);
    fs.appendFile("data/test.dat", jsonData + '\n', 'utf-8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
    });
  
})




app.post('/comments',(req,res)=>{
    console.log(req.body.comments);
    connect.then(db => {
    let formulatomongo = new formula(req.body.comments);
    formulatomongo.save().then(reg => {
    res.status(200).json(result).send('updated successfully');
    })
    .catch(err => { res.status(400).send("failed to post") });
  })
})

app.get('/mongo',(req,res)=>{
  connect.then(db => {
   ledgermongo.find({}).then(result => {
    res.status(200).json(result);
    })
    .catch(err => { res.status(400).send("failed to post") });
  })
})



app.get('/comments',(req,res)=>{
  connect.then(db => {
  formula.find({}).then(result => {
  res.status(200).json(result);
   })
  .catch(err => { res.status(400).send("failed to post") });
  })
})


app.get('/report',(req,res)=>{
  
  fs.readFile('data/file.dat', 'utf8', function(err, contents) {
  const doc = new PDFDocument()
  let filename = 'Ledger report'
  filename = encodeURIComponent(filename) + '.pdf'
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf')
  const content = contents
  doc.y = 300
  doc.text(content, 50, 50)
  doc.pipe(res)
  doc.end()
});
})


// app.get('/cmd',(req,res)=>{
//   cmd.get(
//     'ledger balance -f data/file.dat',
//     function(err, data, stderr){
//     res.send(data);
//        console.log(data);
//     }
// );
// })



app.get('/cmdexp',async(req,res)=>{
  // cmd.get(
  //   'ledger -f data/file.dat register payee "Organic" ',
  //   function(err, data, stderr){
  // res.send(data);
  //  console.log(data);
  //var result = fileAsString.replace(/Expense/g, 'Imports');
var arr=["test.dat","test1.dat","test2.dat"];
for(let i=0;i<arr.length;i++)
{
  var file='data/'+arr[i];
  const options = {
    files: file,
    from: /Expense/g,
    to: 'Imports',
  };
  
  try {
    const results = await replace(options)
    console.log('Replacement results:', results);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}
  res.send('files changes sucessfully')
})


server.listen(PORT, function () {
  console.log('server running');
});













