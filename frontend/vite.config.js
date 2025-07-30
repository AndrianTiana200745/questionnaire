import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import url from 'url';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    host: true,
  },
});

