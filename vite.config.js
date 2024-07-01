
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Correct import
import FullReload from 'vite-plugin-full-reload';
export default defineConfig({
  plugins: [
    react(), // Use the correct plugin
    FullReload(['config/routes.rb', 'app/views/**/*']),
    // Add other plugins as needed
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});


//webhook added