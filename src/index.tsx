import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import { createRoot } from 'react-dom/client';

// import Modal from 'react-modal';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const container = document.getElementById('app');

// Modal.setAppElement(container!);
const root = createRoot(container!);

root.render(<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
</ClerkProvider>);
