// server.js
const http = require('http');

const PORT = process.env.PORT || 3000;

const html = `
<!doctype html>
<html lang="fa">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>صفحه با کادر آبی</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background: #f7f8fa;
      color: #1f2430;
    }
    header {
      background: #1677ff;
      color: white;
      padding: 20px;
    }
    header h1 {
      margin: 0;
      font-size: 24px;
    }
    main {
      padding: 20px;
    }
    .card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 6px 24px rgba(31,36,48,0.06);
    }
    .btn {
      display: inline-block;
      background: #1677ff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn:hover {
      background: #0d5bd3;
    }
    footer {
      text-align: center;
      color: #6b7280;
      padding: 24px 16px 40px;
    }
  </style>
</head>
<body>
<header>
  <h1>DataNet</h1>
  <p>Under Construction</p>
</header>
<main>
  <div class="card">
    <h2>Thank You for Visiting</h2>
    <p>Please check back later.</p>
    <button class="btn">Sample Button</button>
  </div>
</main>
<footer>
  <small>© 2026</small>
</footer>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});