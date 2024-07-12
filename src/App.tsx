import { Dashboard } from './pages/Dashboard';
import './styles/tailwind-input.css';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { LoginPage } from './components/LoginPage';

export default function App() {
	return (
		<header>
			<SignedOut>
				<LoginPage />
			</SignedOut>
			<SignedIn>
				<Dashboard />
			</SignedIn>
		</header>
	);
}
