import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Note: StrictMode removed due to compatibility issues with react-globe.gl
// StrictMode causes double-rendering which breaks the WebGL canvas initialization
createRoot(document.getElementById('root')).render(<App />)
