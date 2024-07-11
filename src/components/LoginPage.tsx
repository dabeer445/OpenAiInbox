// import toast from 'react-hot-toast';
// import { useContext, useState } from 'react';
// import { DashboardContext } from '../utils';
import { SignInButton } from '@clerk/clerk-react';

// const USER_CREDS = {
// 	username: "tester@gmail.com",
// 	password: "tester12345"
// }

export function LoginPage() {
	// const [username, setUsername] = useState('');
	// const [password, setPassword] = useState('');

	// const setIsLoggedIn = useContext(DashboardContext)?.setIsLoggedIn

	// function handleSubmitCredentials() {
	// 	if (!username.length || !password.length) {
	// 		toast.error('Please inform all the credentials');
	// 		return;
	// 	}
	// 	// if (!token || !url) {
	// 	// 	toast.error('Please inform all the credentials');
	// 	// 	return;
	// 	// }

	// 	try {
	// 		// const splittedURL = url.split('/');
	// 		// const workspaceId = splittedURL[4];
	// 		// const botId = splittedURL[6];

	// 		// if (!workspaceId || !botId) {
	// 		// 	throw new Error();
	// 		// }

	// 		// const bpClient = createClient(token, workspaceId, botId);

	// 		// if (!bpClient) {
	// 		// 	throw new Error();
	// 		// }

	// 		// // saves the encrypted credentials to storage
	// 		// storeCredentials({ token, workspaceId, botId });			

	// 		if (username === USER_CREDS.username && password === USER_CREDS.password) {
	// 			setIsLoggedIn?.(true)
	// 		} else {
	// 			throw 'Incorrect Credentials'
	// 		}
	// 	} catch (error) {
	// 		toast.error('You have informed invalid credentials');

	// 		// clearsCredentialsAndClient();
	// 	}

	// 	setUsername('');
	// 	setPassword('');
	// 	// setUserBotpressToken('');
	// 	// setUserBotpressURL('');
	// }

	return (
		<div className="flex flex-col h-screen">
			<SignInButton />
		</div>
	);
}
