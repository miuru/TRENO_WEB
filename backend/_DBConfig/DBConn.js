const mongoose = require('mongoose');

const DBName='Treno';

mongoose.connect('mongodb://127.0.0.1:27017/'+DBName,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connection established.');
}).catch((err)=>{
    console.log(err);
});
module.exports = mongoose;