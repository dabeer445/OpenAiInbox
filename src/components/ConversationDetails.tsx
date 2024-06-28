import { fetchMessagesFromOpenAI } from '../utils';
import { LoadingAnimation } from './interface/Loading';
import { MessageList } from './MessageList';
import { useEffect, useRef, useState } from 'react';

export interface OpenAIMessage {
	threadId: string,
	id: string,
	role: string,
	content: string,
	createdAt: number
}

interface ConversationDetailsProps {
	threadId: string;
	// onDeleteConversation: (conversationId: string) => void;
	// messagesInfo?: {
	// 	list: OpenAIMessage[];
	// 	nextToken?: string;
	// };
	className?: string;
	// isLoading?: boolean
}

export const ConversationDetails = ({
	threadId,
	// onDeleteConversation,
	// messagesInfo,
	className,
	// isLoading
}: ConversationDetailsProps) => {
	const [messages, setMessages] = useState<OpenAIMessage[]>([]);

	const [isLoadingMessages, setIsLoadingMessages] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null);

	const [lastMessageId, setLastMessageId] = useState("")
	const [getOlderMessagesFlag, setGetOlderMessagesFlag] = useState(false)

	useEffect(() => {
		if (threadId.length) {
			setIsLoadingMessages(true)
			fetchMessagesFromOpenAI(threadId, lastMessageId).then(messages => {
				setIsLoadingMessages(false)
				if (messages.length) {

					const x = messages.map(message => ({ threadId, id: message.id, createdAt: message.created_at, role: message.role, content: message.content[0]?.text?.value }))
					setLastMessageId(messages[0]?.id || "")
					setMessages(prev => [...x, ...prev])
				}
			})
		}
	}, [threadId, getOlderMessagesFlag])



	const handleScroll = () => {
		// const { scrollTop, clientHeight, scrollHeight } =
		// 	containerRef.current || { scrollTop: 0, clientHeight: 0, scrollHeight: 0 }
		// console.log(scrollTop)
		// if (scrollTop === 40) {
		// 	console.log("first")
		// 	setMessages(prev => [...prev, ...prev])
		// }
	};

	return (
		<div className={`flex ${className}`}>
			<div className="w-2/3 flex flex-col default-border bg-white">
				{isLoadingMessages ? (
					<div className="self-center bg-zinc-200 p-6 text-lg font-medium rounded-md my-auto flex flex-col items-center gap-5">
						<LoadingAnimation label="Loading messages..." />
						Loading messages...
					</div>
				) : (
					<div className="flex flex-col h-full p-4">
						<div onClick={() => { setGetOlderMessagesFlag(!getOlderMessagesFlag) }}>Load More</div>
						<div ref={containerRef} onScroll={handleScroll} className="overflow-auto h-full">
							<MessageList
								messages={messages}
							/>
						</div>
						{/* <MessageInput
							conversationId={conversation.id}
							addMessageToList={(message: Message) => {
								setMessages((prevMessages) => [
									...prevMessages,
									message,
								]);
							}}
							botpressBotIdAsAUser={botpressBotIdAsAUser}
							handleScrollToBottom={handleScrollToBottom}
						/> */}
					</div>
				)}
			</div>

			{/* <div className="w-1/3 default-border overflow-y-auto bg-white">
				{isLoadingUsers ? (
					<div className="self-center bg-zinc-200 p-6 text-lg font-medium rounded-md my-auto flex flex-col items-center gap-5">
						<LoadingAnimation label="Loading messages..." />
						Loading users' details...
					</div>
				) : (
					<ConversationInfo
						conversation={conversation}
						users={users}
						onDeleteConversation={handleDeleteConversation}
						botpressBotIdAsAUser={botpressBotIdAsAUser}
						className="flex"
					/>
				)}
			</div> */}
		</div>
	);
};
