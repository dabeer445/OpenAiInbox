import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { DashboardContext } from '../utils';

const USER_CREDS = {
	username: "tester@gmail.com",
	password: "tester12345"
}

export function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const setIsLoggedIn = useContext(DashboardContext)?.setIsLoggedIn

	function handleSubmitCredentials() {
		if (!username.length || !password.length) {
			toast.error('Please inform all the credentials');
			return;
		}
		// if (!token || !url) {
		// 	toast.error('Please inform all the credentials');
		// 	return;
		// }

		try {
			// const splittedURL = url.split('/');
			// const workspaceId = splittedURL[4];
			// const botId = splittedURL[6];

			// if (!workspaceId || !botId) {
			// 	throw new Error();
			// }

			// const bpClient = createClient(token, workspaceId, botId);

			// if (!bpClient) {
			// 	throw new Error();
			// }

			// // saves the encrypted credentials to storage
			// storeCredentials({ token, workspaceId, botId });			

			if (username === USER_CREDS.username && password === USER_CREDS.password) {
				setIsLoggedIn?.(true)
			} else {
				throw 'Incorrect Credentials'
			}
		} catch (error) {
			toast.error('You have informed invalid credentials');

			// clearsCredentialsAndClient();
		}

		setUsername('');
		setPassword('');
		// setUserBotpressToken('');
		// setUserBotpressURL('');
	}

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-col gap-5 w-full max-w-xl mx-auto my-auto">
				<form className="border-2 p-10 rounded-md shadow-sm flex flex-col gap-3">
					{/* <Disclaimer full /> */}

					<label htmlFor="" className="flex flex-col gap-1">
						<span className="text-lg font-medium">
							Email
						</span>
						<input
							type="text"
							className="px-3 py-2 rounded-md border-2 bg-white"
							value={username}
							onChange={(event) => {
								setUsername(event.target.value)
								// setUserBotpressURL(event.target.value);
							}}
						/>
						{/* <span className="text-sm italic text-gray-600">
							Go to app.botpress.cloud, open your bot and copy the
							link
						</span> */}
					</label>

					<label htmlFor="" className="flex flex-col gap-1">
						<span className="text-lg font-medium">
							Password
						</span>
						<input
							type="password"
							className="px-3 py-2 rounded-md border-2 bg-white"
							value={password}
							onChange={(event) => {
								setPassword(event.target.value)
								// setUserBotpressToken(event.target.value);
							}}
						/>
						{/* <span className="text-sm italic text-gray-600">
							You can find this by clicking your avatar in the
							dashboard. It will be saved only on your computer!
						</span> */}
					</label>

					<button
						className="w-full p-3 rounded-md bg-blue-500 mx-auto"
						type="button"
						onClick={() =>
							handleSubmitCredentials()
						}
					>
						<span className="text-xl text-white font-medium">
							Continue
						</span>
					</button>
				</form>
			</div>
		</div>
	);
}
