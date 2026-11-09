const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const DIST_DIR = path.join(__dirname, 'dist');
const USE_DIST = fs.existsSync(DIST_DIR);
const ROOT_DIR = USE_DIST ? DIST_DIR : __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') {
        reqUrl = '/index.html';
    }

    let filePath = path.join(ROOT_DIR, reqUrl);

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            serveFile(filePath, res);
            return;
        }

        // Check if file + .html exists
        const htmlPath = filePath + '.html';
        fs.stat(htmlPath, (htmlErr, htmlStats) => {
            if (!htmlErr && htmlStats.isFile()) {
                serveFile(htmlPath, res);
                return;
            }

            // In SPA mode with dist/, fallback to dist/index.html
            if (USE_DIST) {
                const spaIndex = path.join(DIST_DIR, 'index.html');
                if (fs.existsSync(spaIndex)) {
                    serveFile(spaIndex, res);
                    return;
                }
            }

            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1><p><a href="/">Return to Store</a></p>');
        });
    });
});

function serveFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Internal Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
}

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${PORT} is already in use. Retrying on port ${PORT + 1}...`);
        PORT += 1;
        server.listen(PORT);
    } else {
        console.error('Server error:', err);
    }
});

server.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`🚀 NorthSMP React Webstore running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   Mode: ${USE_DIST ? 'Production (dist/)' : 'Development'}`);
    console.log(`===========================================\n`);
});
