import { isDefinedAndHasItems } from '../utils';
import { MessageItem } from './MessageItem';
import { useEffect, useRef } from 'react';
import { OpenAIMessage } from './ConversationDetails';

interface MessageListProps {
	messages: OpenAIMessage[];
}

export const MessageList = ({
	messages,
}: MessageListProps) => {

	const messageListEndRef = useRef<HTMLDivElement>(null);


	function handleScrollToBottom() {
		if (messageListEndRef.current) {
			messageListEndRef.current.scrollIntoView({ behavior: 'smooth' });
		} else {
			console.debug('messageListEndRef.current is null');
		}
	}

	useEffect(() => {
		handleScrollToBottom();
	}, []);


	return (

		// onLoadedData={() => {
		// 	handleScrollToBottom();
		// }}

		<div className="flex-grow flex flex-col gap-1 pr-2">
			{isDefinedAndHasItems(messages) ? (
				<>
					<div className="rounded-md p-2 m-3 border-2 font-medium text-center">
						Start of the conversation
					</div>

					{messages.map((message, index, list) => (
						<MessageItem
							message={message}
							key={index}
						// className={
						// 	list[index - 1]?.direction !==
						// 		message.direction
						// 		? 'mt-2'
						// 		: ''
						// }
						/>
					))}
					<div ref={messageListEndRef} />
				</>
			) : (
				<div className="self-center bg-zinc-200 p-5 text-lg font-medium rounded-md my-auto">
					There are no messages...
				</div>
			)}
		</div>

	);
};
