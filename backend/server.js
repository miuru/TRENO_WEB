const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const routing = require('./routes');
const logger = require('morgan');

const PORT=4000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/',routing);

app.get('/file/:name',(req,res) =>{
    res.sendFile(__dirname + '/public/images/'+req.params.name)
})


app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else
        console.log('Server is up and running in Port:'+PORT+'.');
});
