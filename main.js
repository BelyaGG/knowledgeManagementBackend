const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')

const account = require('./routes/account')
const classes = require('./routes/classes')
const subject = require('./routes/subject')

var path = require('path');

const app = express();

const port = 8081;

console.log('Initialization');


app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(process.cwd()+"/dist/")));

console.log('Route...');
app.get('/', (req , res) => {
  console.log(path.resolve(process.cwd()+"/../dist/index.html"));
  res.sendFile(path.resolve(process.cwd()+"/dist/index.html"));
});

app.use('/account', account)
app.use('/classes', classes)
app.use('/subject', subject)

console.log('Start server on port ' + (process.env.PORT || port))
app.listen(process.env.PORT || port, () => {
    console.log("Server start. Port: " + port)
});

