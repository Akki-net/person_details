const { response } = require('express');
require('dotenv').config()
const http = require('http');
const app = require('./App');
const server = http.createServer(app);
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    logger.info(`server running on port ${PORT}`)
})