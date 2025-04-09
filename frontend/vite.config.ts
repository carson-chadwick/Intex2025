import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
        "img-src 'self' https://mlworkspace6342542406.blob.core.windows.net data:; " +
        "font-src 'self' fonts.gstatic.com data:; " +
        "connect-src 'self' http://localhost:5000 https://localhost:5000; " +
        "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
    },
  },
});
