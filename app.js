const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./connect')
const port =  process.env.PORT || 3005

const crudRouter = require('./routes/crudRouter');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(crudRouter);

app.listen(port,(err) => {
    if(err){
       console.log(err)
       process.exit(); 
    }
    console.log(`App listening on ${port}`)
})
