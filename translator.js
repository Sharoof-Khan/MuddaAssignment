const express  = require('express')
const mongoose = require('mongoose');
const {translate} = require('bing-translate-api')


mongoose.connect('mongodb://127.0.0.1:27017/mudda')
 
var db = mongoose.connection;

db.on('error',console.log.bind(console,'Connection error'))
db.once('open', function () {
    console.log('Connection Successful');

    const translatorSchema = mongoose.Schema({
        input:{type: String,required: true},
        output: { type: String, required: true }
    });

const Translator = mongoose.model("string", translatorSchema)

    // var str1 = new Translator({ str: 'Hola' })

    async function translator(str, lang) {
    // let s2 = []
    let data = await translate(str, null, lang, true)
    
    let res = data.translation
    
    // console.log(res,'res');

    return  res
    
}

//    translator('Hello','hi')
    const main = async () => {

     let result = await translator('Hello', 'hi')
    //  console.log(result,'result');
        
        var str = new Translator({ str: result })
        

        str.save(function (err, str) {
        if (err) return console.error(err)
        console.log(" Output Of Give Str is ",str.str);
    })
 }

    main()
//    main().then((check) => console.log(check,'Check'))
    // console.log('translatedStr:', translatedStr)
    /*var str = new Translator({ str: 'مرحبًا' })
    console.log('str2:', str)
    
    str.save(function (err, str) {
        if (err) return console.error(err)
        console.log(str.str + " Saved Translation String");
    })*/

    /*Translator.find({ "str": "str" }, function (err, translatedStr) {
        if (err) {
            console.log(err);
        }
    })*/
    
//    let s1 = Translator.find().where('str').equals(translatedStr)
//    console.log('s1:', s1)

})
    


// const translatorSchema = new mongoose.Schema({
//     str:{type:String,required:true}
// })
// ra
// const Translator = mongoose.model("string", translatorSchema)

// const app = express();