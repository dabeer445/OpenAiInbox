import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMessagesFromOpenAI, MESSAGES_PAGE_SIZE } from '../utils';
import { LoadingAnimation } from './interface/Loading';
import { useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';
import { useNavigate } from 'react-router-dom';

export interface OpenAIMessage {
	type: string,
	id: string,
	role: string,
	content: string,
	created_at: number
}

interface ConversationDetailsProps {
	threadId: string;
	className?: string;
}

export const ConversationDetails = ({
	threadId,
	className,
}: ConversationDetailsProps) => {
	const navigate = useNavigate();

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
			navigate(`?thread_id=${threadId}`, { replace: true });
			setIsLoadingMessages(true)
			fetchMessagesFromOpenAI(threadId, "").then(msgList => {

				setIsLoadingMessages(false)
				if (msgList.length) {
					const x = msgList.map((message: OpenAIMessage) => (
						{ ...message, content: message.content }
					));
					setLastMessageId(msgList[0]?.id || "")
					setMessages([...x])
					if (msgList.length < MESSAGES_PAGE_SIZE) {
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
			// setIsLoadingMessages(true)
			fetchMessagesFromOpenAI(threadId, lastMessageId).then(messages => {
				if (messages.length) {
					const x = messages.map((message: OpenAIMessage) => (
						{ ...message, content: message.content }
					));
					setLastMessageId(messages[0]?.id || "")
					setMessages(prev => [...prev, ...x])
					if (messages.length <= MESSAGES_PAGE_SIZE) {
						setHadMoreConvs(false)
					}
				} else {
					setHadMoreConvs(false)
				}
			})
		}
	}, [getOlderMessagesFlag])


	return (
		<div className={`flex ${className}`}>
			<div className="w-full flex flex-col default-border bg-white">
				{isLoadingMessages ? (
					<div className="self-center bg-zinc-200 p-6 text-lg font-medium rounded-md my-auto flex flex-col items-center gap-5">
						<LoadingAnimation label="Loading messages..." />
						Loading messages...
					</div>
				) : (
					<div className="flex flex-col h-full p-4">
						{
							messages.length ?
								<div id='scrollableDiv' ref={containerRef} className="overflow-auto h-full flex flex-col">
									<div className="rounded-md p-2 m-3 font-medium text-center opacity-20">
										Start of the conversation
									</div>
									<InfiniteScroll dataLength={99999}
										next={() => {
											setGetOlderMessagesFlag(!getOlderMessagesFlag)
										}}
										loader={<></>}
										hasMore={hadMoreConvs}
										scrollableTarget='scrollableDiv'
										// inverse={true}
										style={{ display: "flex", flexDirection: "column", overflow: "visible" }}
									>
										{/* <MessageItem
											message={{ type: 'text', id: 'abc999', created_at: messages[0].created_at * 1000, role: 'assistant', content: FIRST_MESSAGE }}
											key={-999}
										/> */}
										{messages.map((message, index, list) => (
											<MessageItem
												message={message}
												key={index}
											/>
										))}
									</InfiniteScroll>
								</div> : <div className="self-center bg-zinc-200 p-5 text-lg font-medium rounded-md my-auto">
									There are no messages...
								</div>
						}
					</div>
				)}
			</div>
		</div>
	);
};
