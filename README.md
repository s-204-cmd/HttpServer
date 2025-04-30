# 🚀 Build Your Own HTTP Server (Node.js)

[![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![RFC Compliant](https://img.shields.io/badge/HTTP-RFC%207239-blue)](https://datatracker.ietf.org/doc/html/rfc7230)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status: Actively Built](https://img.shields.io/badge/Status-Actively%20Building-brightgreen)]()


This project is a **custom-built HTTP server** developed from scratch using **Node.js TCP sockets**, without relying on external frameworks like Express, Koa, or Fastify.
It follows real **HTTP/1.1 RFC standards**, handles multiple request types, parses headers, query parameters, and body data, and manages persistent connections.

## 📚 Features

- ✉️ Manual HTTP Request Parsing (Method, Path, Headers, Body)
- 🔎 Support for Query Parameters (`?key=value`)
- 📬 Support for POST Request Body Parsing
  - `application/x-www-form-urlencoded`
  - `application/json`
- 🔁 Persistent Connections (Keep-Alive Support)
- 📋 Basic Routing (GET / POST)
- 🛡️ Error Handling (Connection errors, bad requests)
- 📖 Complies with Core HTTP/1.1 Standards
- 🛠️ Built with only **native Node.js modules** (`net`, `querystring`)

---

## 🏗️ How It Works

- Listens on a TCP socket.
- Reads incoming HTTP requests as raw text.
- Parses request line, headers, query strings, and body manually.
- Routes the request based on method and path.
- Sends back an appropriate HTTP response.

---

## 🚀 Getting Started

 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/custom-node-http-server.git
cd custom-node-http-server

2. Install Dependencies
(No dependencies needed! Only Node.js)

3. Run the Server
node server.js
Server will start on localhost:8080.

📬 Example Requests
1. GET Request
curl http://localhost:8080/

2. GET Request with Query Params
curl "http://localhost:8080/search?name=John&age=30"

3. POST Form Data
curl -X POST http://localhost:8080/submit \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "username=johndoe&password=12345"

4. POST JSON
curl -X POST http://localhost:8080/submit \
-H "Content-Type: application/json" \
-d '{"username": "johndoe", "password": "12345"}'


🛠 Tech Stack
Node.js (v22.x or higher)

Raw TCP Server (net module)

📈 Future Improvements
🌐 Static File Serving
🧩 Middleware System
🛡️ Better HTTP Status Codes
🌍 Path Parameters Routing (e.g., /users/:id)
🔒 HTTPS Support
📄 Simple HTML templating
🧠 Learnings

Building this server deepened my understanding of:
How browsers communicate with servers.
How HTTP parsing works under the hood.
The lifecycle of a TCP connection.
The principles behind web frameworks like Express.js.

🤝 Contributions
Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

📜 License
This project is open source under the MIT License.

Built with ❤️ and pure Node.js.
