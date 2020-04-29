const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport')
const config = require('./config/db');
const account = require('./routes/account')


const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true} )

mongoose.connection.on('connected', ()=> {
  console.log('MongoDB active')
})

mongoose.connection.on('error', (err)=> {
  console.log('MongoDB error'+ err)
})

app.get('/', (req , res) => {
  res.send('Hello!');
});

app.use('/account', account)

app.listen(port, () => {
    console.log("Server start. Port: " + port)
});