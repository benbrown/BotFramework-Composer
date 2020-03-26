// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { join, resolve } from 'path';

import { mkdirp } from 'fs-extra';
import { app, BrowserWindow } from 'electron';
import fixPath from 'fix-path';

import { getUnpackedAsarPath } from './utility/getUnpackedAsarPath';

function main() {
  console.log('Starting electron app');
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });

  const CONTENT_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'http://localhost:5000/';
  console.log('Loading project from: ', CONTENT_URL);

  setTimeout(() => {
    win.loadURL(CONTENT_URL);
    win.maximize();
    win.show();
  }, 2000);
}

async function createAppDataDir() {
  const appDataBasePath: string = process.env.APPDATA || process.env.HOME || '';
  const compserAppDataDirectoryName = 'BotFrameworkComposer';
  const composerAppDataPath: string = resolve(appDataBasePath, compserAppDataDirectoryName);
  process.env.COMPOSER_APP_DATA = join(composerAppDataPath, 'data.json'); // path to the actual data file
  console.log('creating composer app data path at: ', composerAppDataPath);
  await mkdirp(composerAppDataPath);
}

async function run() {
  fixPath();
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      main();
    }
  });

  console.log('Waiting for app to be ready...');
  await app.whenReady();
  console.log('App ready');

  const unpackedDir = getUnpackedAsarPath();
  process.env.COMPOSER_RUNTIME_FOLDER = join(unpackedDir, 'build', 'templates');

  console.log('Creating app data directory...');
  await createAppDataDir();
  console.log('Created app data directory.');

  console.log('Starting server...');
  const { start } = await import('@bfc/server');
  await start(join(unpackedDir, 'build', 'plugins'));
  console.log('Server started. Rendering application...');

  main();
}

run()
  .catch(e => {
    console.error(e);
    app.quit();
  })
  .then(() => {
    console.log('Run completed');
  });
