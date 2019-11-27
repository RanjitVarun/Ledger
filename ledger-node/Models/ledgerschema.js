const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LedgerSchema = new Schema(
    {
        date: {
            type:Date
        },
        effectiveDate: {
            type: Date
        },
        payee: {
            type: String
        },
        pending: {
            type: String
        },
        cleared: {
            type: String
        },
        Postings: [{
          account:{
              type:String
          },
          commodity:{
              amount:{
                type:Number
              }
              
          }
        }]
    },
    );

let ledgerschema = mongoose.model("ledgerschema", LedgerSchema);
module.exports = ledgerschema;