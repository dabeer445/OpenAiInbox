import { ConversationDetails } from '../components/ConversationDetails';
import { ConversationList } from '../components/ConversationList';
import { Header } from '../components/interface/Header';
import { useState } from 'react';
import { DashboardContext } from '../utils';
import { LoginPage } from '../components/LoginPage';

export const Dashboard = () => {
	const [selectedThreadId, setSelectedThreadId] = useState("");

	const [isLoggedIn, setIsLoggedIn] = useState(true)

	return <>

		<DashboardContext.Provider value={{
			selectedThreadId,
			updateThreadId(threadId) {
				setSelectedThreadId(threadId)
			},
			setIsLoggedIn
		}}>
			{
				isLoggedIn ? <div className="flex flex-col h-screen overflow-hidden bg-zinc-100 text-gray-800">
					{/* HEADER */}
					<Header
						handleLogout={() => { }}
						botName="Pacha Whatsapp AI"
						// botName={botInfo.name}
						className="flex-shrink-0 h-14"
					/>

					{/* CONVERSATIONS */}
					<div className="mx-2 mb-2 gap-2 flex overflow-hidden h-full">
						<div className="flex flex-col gap-2 w-1/4">
							{/* CONVERSATION LIST */}

							<ConversationList
							/>
						</div>

						{/* CONVERSATION DETAILS */}
						<div className="flex w-3/4 h-full">
							{selectedThreadId.length ? (
								<ConversationDetails
									threadId={selectedThreadId}
									className="w-full gap-1"
								/>
							) : (
								<div className="bg-zinc-200 p-5 text-lg font-medium rounded-md my-auto mx-auto">
									Select a conversation to see details
								</div>
							)}
						</div>
					</div>
					{/* <div className="m-2">
				<Disclaimer />
			</div> */}
				</div> : <LoginPage />
			}
		</DashboardContext.Provider>


	</>
};
