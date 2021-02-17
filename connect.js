const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL,{ useCreateIndex : true , useUnifiedTopology : true , useNewUrlParser : true}).then(() =>{
    console.log('DB Connected')
}).catch((e) => {
    console.log(e)
})