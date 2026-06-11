// Temp script: scrolled viewport screenshots to verify mid-page sections.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9335;
const PROFILE = "C:\\Users\\User\\AppData\\Local\\Temp\\edge-cdp-profile-transak2";
const OUT = "C:\\Users\\User\\AppData\\Local\\Temp\\transak-shots";
const BASE = "http://localhost:3100";

const proc = spawn(EDGE, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE}`,
  "--window-size=1600,1100",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function jsonNew(url) {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  return res.json();
}

let id = 0;
function send(ws, method, params = {}) {
  return new Promise((resolve) => {
    const msgId = ++id;
    const handler = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id === msgId) {
        ws.removeEventListener("message", handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}

async function scrollShots(path, name, count) {
  const target = await jsonNew(`${BASE}${path}`);
  await sleep(500);
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  await send(ws, "Page.enable");
  await send(ws, "Runtime.enable");
  await sleep(3000);

  for (let i = 1; i <= count; i++) {
    await send(ws, "Runtime.evaluate", {
      expression: `window.scrollTo({ top: ${i} * window.innerHeight * 0.95, behavior: "instant" })`,
    });
    await sleep(1400);
    const shot = await send(ws, "Page.captureScreenshot", { format: "png" });
    writeFileSync(`${OUT}\\${name}-scroll${i}.png`, Buffer.from(shot.data, "base64"));
  }
  ws.close();
}

async function main() {
  await sleep(2500);
  await scrollShots("/", "accueil", 5);
  await scrollShots("/vendre", "vendre", 3);
  proc.kill();
  process.exit(0);
}

main().catch((e) => {
  writeFileSync(`${OUT}\\error-scroll.txt`, String(e.stack || e));
  proc.kill();
  process.exit(1);
});
