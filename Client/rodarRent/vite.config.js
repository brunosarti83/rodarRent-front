import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  // proxy:{
  //   "/socket.io":{
  //     target: "http://localhost:4000",
  //     ws: true
  //   }
  // }
});
