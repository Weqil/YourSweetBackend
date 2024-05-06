const express = require('express');
const http = require('http');
const port = 3500;
const app = express();

const requestController = require('./controllers/main-controller');

app.use('/filmAvatar', express.static('storage/filmAvatar'));
app.use('/filmVideo', express.static('storage/filmVideo'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    next();
});

app.use(requestController);

http.createServer(app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
