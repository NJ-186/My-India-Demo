// const https = require('https');
const http = require('http')
const fs = require('fs');
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;

// SSL/TLS configuration
const options = {} //{
//     key: fs.readFileSync('path/to/privkey.pem'),
//     cert: fs.readFileSync('path/to/fullchain.pem')
// };

// Connect to database
connectDB();

// Start server
http.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
