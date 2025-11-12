import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Robust __dirname handling for ESM and packaged apps
let __dirnamePath: string;
try {
  __dirnamePath = path.dirname(fileURLToPath(import.meta.url));
} catch (err) {
  __dirnamePath = process.cwd();
}

export const DIRNAME = __dirnamePath;
export const APP_ROOT = path.join(DIRNAME, '..');
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(APP_ROOT, 'dist');
export const VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(APP_ROOT, 'public')
  : RENDERER_DIST;

export const FRAME = { WIDTH: 1000, HEIGHT: 750 };

export default {
  DIRNAME,
  APP_ROOT,
  VITE_DEV_SERVER_URL,
  MAIN_DIST,
  RENDERER_DIST,
  VITE_PUBLIC,
  FRAME,
};
