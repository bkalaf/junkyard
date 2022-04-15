import { App } from './components/App';
import { createRoot } from 'react-dom/client';

const el = document.getElementById('app-root');

createRoot(el!).render(<App />);