import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

const uploadPlugin = (): Plugin => ({
  name: 'upload-image-api',
  configureServer(server) {
    server.middlewares.use('/api/upload-photo', (req, res) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.imageData) {
              const base64Data = data.imageData.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');
              const publicImagesDir = path.resolve(__dirname, 'public/images');
              if (!fs.existsSync(publicImagesDir)) {
                fs.mkdirSync(publicImagesDir, { recursive: true });
              }
              
              // Write to all target image files so all sections have it
              const targetFiles = [
                'hero.svg',
                'ammuka-portrait.svg',
                'childhood.svg',
                'memory-1.svg',
                'memory-2.svg',
                'memory-3.svg',
                'memory-4.svg',
                'funny-1.svg',
                'funny-2.svg',
                'funny-3.svg',
                'final.jpg'
              ];

              targetFiles.forEach(file => {
                fs.writeFileSync(path.join(publicImagesDir, file), buffer);
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'All images updated successfully' }));
              return;
            }
          } catch (e) {
            console.error('Failed to parse uploaded image', e);
          }
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
        });
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  }
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), uploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

