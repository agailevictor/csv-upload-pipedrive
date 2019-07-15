const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes/index');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;