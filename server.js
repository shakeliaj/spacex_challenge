const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const app = express();
const PORT = 8000

app.use(cors())
app.use(bodyParser.json({type: ['application/json']}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname + '/app')))

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/index.html'))
})

app.listen(PORT, function() {
	console.log('listening on port 8000')
})