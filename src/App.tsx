import { Dashboard } from './pages/Dashboard';
import './styles/tailwind-input.css';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
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
		<header>
			<SignedOut>
				<>
					<LoginPage />
					{/* <SignInButton /> */}
				</>
			</SignedOut>
			<SignedIn>

				<Dashboard />
				{/* <UserButton /> */}
			</SignedIn>
		</header>
	);
}
