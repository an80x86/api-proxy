const express = require('express');
const cors = require('cors')
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();
app.options('*', cors());

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://bund.adijital.com";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/p', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/p`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
