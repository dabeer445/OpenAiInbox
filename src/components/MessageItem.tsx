import { OpenAIMessage } from './ConversationDetails';

interface MessageItemProps {
	message: OpenAIMessage;
	className?: string;
}

export const MessageItem = ({ message, className }: MessageItemProps) => {
	return (
		<div
			className={`flex flex-col pb-3 ${message.role === 'assistant'
				? 'self-start items-start pr-5'
				: 'self-end items-end pl-5'
				} ${className}`}
		>
			<div
				className={`px-3 py-2 rounded-2xl ${message.role === 'assistant'
					? 'bg-blue-500 text-white'
					: 'bg-gray-200'
					}`}
			>
				{message.content}
			</div>
			{/* <ReactMessageRenderer
				content={{
					type: 'text',
					text: message.payload.text,
				}}
				config={defaultMessageConfig}
			/> */}
			<span className="text-sm text-gray-300">
				{new Date(message.createdAt * 1000).toLocaleString()}
			</span>
		</div>
	);
};
