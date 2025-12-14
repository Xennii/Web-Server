from http.server import SimpleHTTPRequestHandler, HTTPServer

# Server settings
host = "localhost"  # or "0.0.0.0" to allow external access
port = 8080

# Create server
server = HTTPServer((host, port), SimpleHTTPRequestHandler)
print(f"Server started at http://{host}:{port}")

# Keep it running
server.serve_forever()
