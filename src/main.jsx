import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import { router } from './routes/Routes'
import { Toaster } from 'react-hot-toast'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { HelmetProvider } from 'react-helmet-async'
import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
import { ReactLenis } from '@studio-freight/react-lenis'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </ReactLenis>
    </QueryClientProvider>
  </HelmetProvider>
)
