import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMessagesFromOpenAI, FIRST_MESSAGE, MESSAGES_PAGE_SIZE } from '../utils';
import { LoadingAnimation } from './interface/Loading';
import { useEffect, useRef, useState } from 'react';
import { MessageItem } from './MessageItem';

export interface OpenAIMessage {
	threadId: string,
	id: string,
	role: string,
	content: string,
	createdAt: number
}

interface ConversationDetailsProps {
	threadId: string;
	className?: string;
}

export const ConversationDetails = ({
	threadId,
	className,
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
			fetchMessagesFromOpenAI(threadId, "").then(msgList => {
				setIsLoadingMessages(false)
				if (msgList.length) {
					const x = msgList.map((message: { threadId: any, id: any; created_at: any; role: any; content: { text: { value: any; }; }[]; }) => ({ threadId, id: message.id, createdAt: message.created_at, role: message.role, content: message.content?.[0]?.text?.value }))
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
					const x = messages.map((message: { threadId: any, id: any; created_at: any; role: any; content: { text: { value: any; }; }[]; }) => ({ threadId, id: message.id, createdAt: message.created_at, role: message.role, content: message.content[0]?.text?.value }))
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
								<div id='scrollableDiv' ref={containerRef} className="overflow-auto h-full flex flex-col-reverse">
									<InfiniteScroll dataLength={99999}
										next={() => {
											setGetOlderMessagesFlag(!getOlderMessagesFlag)
										}}
										loader={<></>}
										hasMore={hadMoreConvs}
										scrollableTarget='scrollableDiv'
										inverse={true}
										style={{ display: "flex", flexDirection: "column-reverse", overflow: "visible" }}
									>
										{messages.slice(1, messages.length - 1).map((message, index, list) => (
											<MessageItem
												message={message}
												key={index}
											/>
										))}
										<MessageItem
											message={{ threadId: messages?.[0].threadId, id: 'abc999', createdAt: messages?.[0]?.createdAt ?? new Date().getTime(), role: 'assistant', content: FIRST_MESSAGE }}
											key={-999}
										/>
									</InfiniteScroll>
									<div className="rounded-md p-2 m-3 font-medium text-center opacity-20">
										Start of the conversation
									</div>
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
