import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
 
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     host: '0.0.0.0',  // Allows access from other devices on the same network
//     port: 5173,       // Default Vite port (change if needed)
//     proxy: {
//       '/api': 'http://192.168.1.68:5000', // Proxy API calls to backend
//     },
//   },
// })

