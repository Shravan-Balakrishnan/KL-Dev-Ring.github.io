import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { ROOT } from "./lib.js";

const port = Number(process.env.PORT || 4173);
const dist = path.join(ROOT, "dist");

function build() {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(ROOT, "scripts", "build.js")], { stdio: "inherit" });
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error("Build failed")));
  });
}

await build();
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  let file = path.join(dist, urlPath);
  if (urlPath.endsWith("/")) file = path.join(file, "index.html");
  if (!path.extname(file) && !fs.existsSync(file)) file = path.join(file, "index.html");
  if (!file.startsWith(dist) || !fs.existsSync(file)) {
    res.writeHead(404); res.end("Not found"); return;
  }
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`KL Dev-Ring is live at http://localhost:${port}`));
