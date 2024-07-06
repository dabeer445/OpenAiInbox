import { ConversationDetails } from '../components/ConversationDetails';
import { ConversationList } from '../components/ConversationList';
import { Header } from '../components/interface/Header';
import { useState } from 'react';
import { DashboardContext } from '../utils';
import { LoginPage } from '../components/LoginPage';


// export interface ConversationWithMessages extends Conversation {
// 	messages: Message[];
// 	nextMessagesToken?: string;
// }




export const Dashboard = () => {



	const [selectedThreadId, setSelectedThreadId] = useState("");

	const [isLoggedIn, setIsLoggedIn] = useState(true)

	// const updateThreadId = (threadId: string) => { setSelectedThreadId(threadId) }

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			setIsLoadingConversations(true);
	// 			const conversations = await loadConvs();
	// 			// const messages = await fetchMessagesFromOpenAI(conversations[0].threadID);
	// 			// console.log("MSDS", messages)
	// 			setConversationList(conversations);

	// 		} catch (error: any) {
	// 			toast.error("Couldn't load conversations");
	// 		} finally {
	// 			setIsLoadingConversations(false);
	// 		}
	// 	})();
	// }, [supabase]);



	return <>

		{isLoggedIn ? <DashboardContext.Provider value={{
			selectedThreadId, updateThreadId(threadId) {
				setSelectedThreadId(threadId)
			},
		}}>
			<div className="flex flex-col h-screen overflow-hidden bg-zinc-100 text-gray-800">
				{/* HEADER */}
				<Header
					handleLogout={() => { }}
					botName="Test"
					// botName={botInfo.name}
					className="flex-shrink-0 h-14"
				/>
				{/* CONVERSATIONS */}
				<div className="mx-2 mb-2 gap-2 flex overflow-hidden h-full">
					<div className="flex flex-col gap-2 w-1/4">
						{/* CONVERSATION LIST */}

						<ConversationList
						// conversations={conversationList}
						// onSelectConversation={handleClickConversation}
						// selectedConversation={selectedConversation[0]?.threadId}
						// loadOlderConversations={async () => { }}
						// hasMoreConversations={
						// 	nextConversationsToken ? true : false
						// }
						// className="bg-white"
						/>



					</div>

					{/* CONVERSATION DETAILS */}
					<div className="flex w-3/4 h-full">
						{selectedThreadId.length ? (
							<ConversationDetails
								threadId={selectedThreadId}
								// messagesInfo={{
								// 	list: selectedConversation.messages,
								// 	nextToken:
								// 		selectedConversation.nextMessagesToken,
								// }}
								// isLoading={isLoadingMessages}
								className="w-full gap-1"
							// onDeleteConversation={(conversationId: string) => {
							// setSelectedConversation(undefined);
							// setConversationList((prev) =>
							// 	prev.filter(
							// 		(conversation) =>
							// 			conversation.id !== conversationId
							// )
							// );
							// }}
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
			</div>
		</DashboardContext.Provider> : <LoginPage clearsCredentialsAndClient={() => { }} />}
	</>
};
