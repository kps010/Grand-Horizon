const mysql = require("mysql");
const http = require("http");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "grand_horizon",
  connectioLimit: 10,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// Create a simple server
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url === "/dealers" && req.method === "GET") {
    db.query("SELECT * FROM dealers", (err, results) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }

      // Enable CORS so frontend can call this API
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify(results));
    });
  } else if (req.url === "/contact" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body); // expects { name, email, phone, message }

        const sql =
          "INSERT INTO contact_us (name, email, phone, message) VALUES (?, ?, ?, ?)";
        db.query(
          sql,
          [data.name, data.email, data.phone, data.message],
          (err, result) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: err.message }));
              return;
            }

            res.writeHead(200, {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            });
            res.end(
              JSON.stringify({ message: "✅ Contact saved successfully!" })
            );
          }
        );
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON format" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
