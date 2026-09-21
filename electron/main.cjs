const { app, BrowserWindow, dialog } = require('electron');
const { fork } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');

const PORT = 3000;
let serverProcess;
let mainWindow;

function configureRuntime() {
  const userDataPath = app.getPath('userData');
  const envPath = path.join(userDataPath, '.env');
  const examplePath = path.join(process.resourcesPath, '.env.example');

  fs.mkdirSync(userDataPath, { recursive: true });
  if (!fs.existsSync(path.join(userDataPath, '.env.example')) && fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, path.join(userDataPath, '.env.example'));
  }
  dotenv.config({ path: envPath, quiet: true });

  Object.assign(process.env, {
    ...process.env,
    NODE_ENV: 'production',
    DESKTOP_MODE: 'true',
    ALLOW_INSECURE_LOCAL_AUTH: 'true',
    PORT: String(PORT),
    CORS_ORIGINS: `http://localhost:${PORT},http://127.0.0.1:${PORT}`,
    APP_ROOT: app.getAppPath(),
    STORAGE_DIR: path.join(userDataPath, 'data', 'artifacts'),
    ANALYSIS_STORAGE_DIR: path.join(userDataPath, 'data', 'analyses'),
  });
}

function waitForServer(timeoutMs = 30000) {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    const probe = () => {
      const request = http.get(`http://127.0.0.1:${PORT}/api/health`, (response) => {
        response.resume();
        if (response.statusCode === 200) return resolve();
        retry();
      });
      request.on('error', retry);
      request.setTimeout(2000, () => request.destroy());
    };
    const retry = () => {
      if (Date.now() - startedAt >= timeoutMs) return reject(new Error('Yerel uygulama sunucusu başlatılamadı.'));
      setTimeout(probe, 250);
    };
    probe();
  });
}

function startServer() {
  serverProcess = fork(path.join(app.getAppPath(), 'dist', 'server.cjs'), [], {
    env: process.env,
    silent: false,
  });
  serverProcess.on('error', (error) => console.error('TerraSat server process error:', error));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 720,
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
}

app.whenReady().then(async () => {
  configureRuntime();
  startServer();
  try {
    await waitForServer();
    createWindow();
  } catch (error) {
    dialog.showErrorBox('TerraSat AI başlatılamadı', error.message);
    app.quit();
  }
});

app.on('window-all-closed', () => app.quit());
app.on('before-quit', () => {
  if (serverProcess && !serverProcess.killed) serverProcess.kill();
});
