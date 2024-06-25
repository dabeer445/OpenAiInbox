import toast from 'react-hot-toast';
import { Conversation } from '@botpress/client';
import { ConversationDetails, OpenAIMessage } from '../components/ConversationDetails';
import { ConversationList } from '../components/ConversationList';
import { Header } from '../components/interface/Header';
import { LoadingAnimation } from '../components/interface/Loading';

import { useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';

export interface ConversationWithMessages extends Conversation {
	name: string;
	number: string;
	threadID: string;
	created_at: string;
}
// export interface ConversationWithMessages extends Conversation {
// 	messages: Message[];
// 	nextMessagesToken?: string;
// }

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API, dangerouslyAllowBrowser: true });

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const loadConvs = async () => {
	const { data, error } = await supabase
		.from('Conversations')
		.select('*');
	if (error) throw error;
	return data;
};

const fetchMessagesFromOpenAI = async (threadID: string) => {
	const threadMessages = await openai.beta.threads.messages.list(threadID);

	return threadMessages.data;
};


export const Dashboard = () => {
	const [isLoadingMessages, setIsLoadingMessages] = useState(false);
	const [isLoadingConversations, setIsLoadingConversations] =
		useState<boolean>(true);

	const [selectedConversation, setSelectedConversation] =
		useState<OpenAIMessage[]>([]);

	const [conversationList, setConversationList] = useState<
		ConversationWithMessages[]
	>([]);
	const [nextConversationsToken, setNextConversationsToken] =
		useState<string>();
	useEffect(() => {
		(async () => {
			try {
				setIsLoadingConversations(true);
				const conversations = await loadConvs();
				// const messages = await fetchMessagesFromOpenAI(conversations[0].threadID);
				// console.log("MSDS", messages)
				setConversationList(conversations);

			} catch (error: any) {
				toast.error("Couldn't load conversations");
			} finally {
				setIsLoadingConversations(false);
			}
		})();
	}, [supabase]);

	const handleClickConversation = async (threadId: string) => {
		setIsLoadingMessages(true)
		const messages = await fetchMessagesFromOpenAI(threadId)
		setIsLoadingMessages(false)
		const x = messages.map(message => ({ threadId, id: message.id, createdAt: message.created_at, role: message.role, content: message.content[0].text.value }))
		setSelectedConversation(x)
	}

	return <>
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
					<aside className="w-full flex-col flex flex-1 rounded-md border border-zinc-200 overflow-auto">
						<ConversationList
							conversations={conversationList}
							onSelectConversation={handleClickConversation}
							selectedConversation={selectedConversation[0]?.threadId}
							loadOlderConversations={async () => { }}
							hasMoreConversations={
								nextConversationsToken ? true : false
							}
							className="bg-white"
						/>

						{isLoadingConversations && (
							<div className="self-center bg-zinc-200 p-6 text-lg font-medium rounded-md my-auto flex flex-col items-center gap-5">
								<LoadingAnimation label="Loading messages..." />
								Loading conversations...
							</div>
						)}
					</aside>
				</div>

				{/* CONVERSATION DETAILS */}
				<div className="flex w-3/4 h-full">
					{selectedConversation ? (
						<ConversationDetails
							conversation={selectedConversation}
							// messagesInfo={{
							// 	list: selectedConversation.messages,
							// 	nextToken:
							// 		selectedConversation.nextMessagesToken,
							// }}
							isLoading={isLoadingMessages}
							className="w-full gap-1"
							onDeleteConversation={(conversationId: string) => {
								// setSelectedConversation(undefined);
								setConversationList((prev) =>
									prev.filter(
										(conversation) =>
											conversation.id !== conversationId
									)
								);
							}}
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
	</>

};
