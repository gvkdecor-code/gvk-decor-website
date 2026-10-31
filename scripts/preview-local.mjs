import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const version = JSON.parse(
  readFileSync(join(root, "preview-version.json"), "utf8"),
);
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 12)) {
  console.error(
    "Install current Node.js LTS from https://nodejs.org/ then reopen START-PREVIEW.cmd.",
  );
  process.exit(1);
}
const hash = createHash("sha256")
  .update(readFileSync(join(root, "package-lock.json")))
  .digest("hex");
const stamp = join(root, "node_modules", ".gvk-lock-sha256");
const installed =
  existsSync(stamp) &&
  readFileSync(stamp, "utf8") === hash &&
  existsSync(join(root, "node_modules", "vite", "bin", "vite.js"));
console.log(`GVK Decor private preview — ${version.revision}`);
console.log(`Folder: ${root}`);
console.log(
  "An old downloaded ZIP does not update when GitHub changes. Use a fresh ZIP from main.",
);
if (process.argv.includes("--check")) {
  console.log(
    `Node ${process.versions.node}; dependencies ${installed ? "current" : "will be installed/refreshed on start"}.`,
  );
  process.exit(0);
}
const free = await new Promise((resolve) => {
  const server = createServer();
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE")
      console.error(
        "Port 5173 is already in use. Stop the OLD preview window with Ctrl+C, then reopen this NEW copy.",
      );
    else console.error(error.message);
    resolve(false);
  });
  server.listen(5173, "127.0.0.1", () => server.close(() => resolve(true)));
});
if (!free) process.exit(1);
if (!installed) {
  console.log("Installing locked dependencies. Internet access is required.");
  const result =
    process.platform === "win32"
      ? spawnSync(
          process.env.ComSpec || "cmd.exe",
          ["/d", "/s", "/c", "npm ci --no-audit --no-fund"],
          { cwd: root, stdio: "inherit" },
        )
      : spawnSync("npm", ["ci", "--no-audit", "--no-fund"], {
          cwd: root,
          stdio: "inherit",
        });
  if (result.error || result.status !== 0) {
    console.error(
      "Dependency installation failed. Copy the error above for help.",
    );
    process.exit(1);
  }
  writeFileSync(stamp, hash);
}
console.log(
  "Keep this window open. Ctrl+C stops the preview. No public website is published.",
);
const child = spawn(
  process.execPath,
  [
    join(root, "node_modules", "vite", "bin", "vite.js"),
    "--host",
    "127.0.0.1",
    "--port",
    "5173",
    "--strictPort",
  ],
  { cwd: root, stdio: ["inherit", "pipe", "inherit"] },
);
let opened = false;
child.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
  if (!opened && chunk.toString().includes("http://127.0.0.1:5173")) {
    opened = true;
    console.log(
      `Chrome address: http://127.0.0.1:5173 — look for ${version.revision} at the bottom left.`,
    );
    if (process.platform === "win32") {
      const opener = spawn(
        process.env.ComSpec || "cmd.exe",
        ["/d", "/s", "/c", 'start "" "http://127.0.0.1:5173"'],
        { stdio: "ignore", detached: true },
      );
      opener.on("error", () => {});
      opener.unref();
    }
  }
});
process.on("SIGINT", () => child.kill("SIGINT"));
child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code || 0;
});
