import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMessagesFromOpenAI, MESSAGES_PAGE_SIZE } from '../utils';
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

	const [hadMoreConvs, setHadMoreConvs] = useState(true)

	const initialRender = useRef(true)

	useEffect(() => {
		initialRender.current = false
		if (threadId.length) {
			setIsLoadingMessages(true)
			fetchMessagesFromOpenAI(threadId, "").then(messages => {
				setIsLoadingMessages(false)
				if (messages.length) {
					console.log(messages.length)
					const x = messages.map(message => ({ threadId, id: message.id, createdAt: message.created_at, role: message.role, content: message.content[0]?.text?.value }))
					console.log(messages[0]?.id)
					setLastMessageId(messages[0]?.id || "")
					setMessages([...x])
					if (messages.length < MESSAGES_PAGE_SIZE) {
						setHadMoreConvs(false)
					}
				} else {
					setHadMoreConvs(false)
				}
			})
		}
	}, [threadId])

	useEffect(() => {
		if (threadId.length && lastMessageId.length) {
			console.log(initialRender)
			// setIsLoadingMessages(true)
			fetchMessagesFromOpenAI(threadId, lastMessageId).then(messages => {
				console.log(lastMessageId)
				if (messages.length) {
					const x = messages.map(message => ({ threadId, id: message.id, createdAt: message.created_at, role: message.role, content: message.content[0]?.text?.value }))
					setLastMessageId(messages[0]?.id || "")
					setMessages(prev => [...prev, ...x])
				} else {
					setHadMoreConvs(false)
				}
			})
		}
	}, [getOlderMessagesFlag])



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
						{/* <div onClick={() => { setGetOlderMessagesFlag(!getOlderMessagesFlag) }}>Load More</div> */}
						<div id='scrollableDiv' ref={containerRef} className="overflow-auto h-full">

							<InfiniteScroll dataLength={99999}
								next={() => {
									console.log("first")
									setGetOlderMessagesFlag(!getOlderMessagesFlag)
								}}
								loader={<h4 className=''>Loading</h4>}
								hasMore={hadMoreConvs}
								scrollableTarget='scrollableDiv'>
								<MessageList
									messages={messages}
								/>
							</InfiniteScroll>

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
