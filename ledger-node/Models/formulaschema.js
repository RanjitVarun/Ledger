const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formulaschema = new Schema(
    {
    formula:{
        type:String
    }
    }  
    );

let Formulaschema = mongoose.model("formula", formulaschema);
module.exports = Formulaschema;