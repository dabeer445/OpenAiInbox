import { BotpressClientContextProvider } from './hooks/botpressClient';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import './styles/tailwind-input.css';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { LoginPage } from './components/LoginPage';

export default function App() {
	return (
		// <BotpressClientContextProvider>
		// 	<BrowserRouter>
		// 		<Routes>
		// 			<Route path="/" element={<Dashboard />} />
		// 			<Route path="*" element={<div>Num achei</div>} />
		// 		</Routes>
		// 		<Toaster />
		// 	</BrowserRouter>
		// </BotpressClientContextProvider>
		<>
			<SignedOut>
				<LoginPage />
				{/* <SignInButton /> */}
			</SignedOut>
			<SignedIn>
				<BotpressClientContextProvider>
					<Dashboard />
				</BotpressClientContextProvider>
			</SignedIn>
		</>
	);
}
