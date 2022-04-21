const express  = require('express')
const mongoose = require('mongoose');
const { translate } = require('bing-translate-api');

const app = express();



mongoose.connect('mongodb://127.0.0.1:27017/mudda')
 
var db = mongoose.connection;

db.on('error',console.log.bind(console,'Connection error'))
db.once('open', function () {
    console.log('Connection Successful');

    const translatorSchema = mongoose.Schema({
        input:{type: String},
        output: { type: String, }
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
app.use(express.json())
    const main = async () => {

        let inp = 'Bad'    //Input

        var verify = null;
        app.get("/strings", async (req, res) => {
            try {
                const data = await Translator.findOne({input:{$eq:inp}}).lean().exec()
                res.status(200).send({data})

                // console.log(data.output,'data');
               let verify = data.output
            //    console.log('verify:', verify)
                if (verify) {
        // var str = new Translator({ input: obj.input,output: obj.output })
                    console.log(`Output of ${inp} Translated String is ${verify} From Db`);
               
                } else {
                    let result = await translator(inp, 'hi')    // 1st argument is Input String and 2 nd argument is for languages like English = en,Hindi = hi,Spainesh = es, Arabic = ar etc..
    //  console.log(result,'result');
        let obj = {

        }
        obj.input = inp;
        obj.output = result;

        // console.log(obj,'Obj');
        var str = new Translator({ input: obj.input,output: obj.output })
        

        str.save(function (err, str) {
        if (err) return console.error(err)
        console.log(`Output Of ${str.input} String is ${str.output} from API`);
    })
     }


            } catch (err) {
                console.error(err)
                
            }
        })
     
 }

    main()

    }
)
    

app.listen(4400, () => {
    console.log('Port Listning 4400');
})