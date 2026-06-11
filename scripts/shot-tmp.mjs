// Temp script: full-page screenshots of the 4 pages via headless Edge + CDP.
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9334;
const PROFILE = "C:\\Users\\User\\AppData\\Local\\Temp\\edge-cdp-profile-transak";
const OUT = "C:\\Users\\User\\AppData\\Local\\Temp\\transak-shots";
const BASE = "http://localhost:3100";

mkdirSync(OUT, { recursive: true });

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

async function shootPage(path, name) {
  const target = await jsonNew(`${BASE}${path}`);
  await sleep(500);
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  await send(ws, "Page.enable");
  await send(ws, "Runtime.enable");
  await sleep(3500);

  // Force all reveal animations so below-fold content is visible in capture
  await send(ws, "Runtime.evaluate", {
    expression: `document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'))`,
  });
  await sleep(900);

  // Viewport shot (hero as a visitor sees it)
  let shot = await send(ws, "Page.captureScreenshot", { format: "png" });
  writeFileSync(`${OUT}\\${name}-viewport.png`, Buffer.from(shot.data, "base64"));

  // Full page shot
  shot = await send(ws, "Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(`${OUT}\\${name}-full.png`, Buffer.from(shot.data, "base64"));

  ws.close();
}

async function main() {
  await sleep(2500);
  await shootPage("/", "accueil");
  await shootPage("/vendre", "vendre");
  await shootPage("/vehicules", "vehicules");
  await shootPage("/contact", "contact");
  proc.kill();
  process.exit(0);
}

main().catch((e) => {
  writeFileSync(`${OUT}\\error.txt`, String(e.stack || e));
  proc.kill();
  process.exit(1);
});
