import React from 'react';
import { OpenAIMessage } from './ConversationDetails';

interface MessageItemProps {
	message: OpenAIMessage;
	className?: string;
}

const IMAGES = [
	"cat_dont_want_to_use",
	"odour_control",
	"dust_issue",
	"paw_tracking",
	"dirty_ground",
	"litter_box_maintenance",
	"too_expensive",
	"too_heavy",
	"annoying_to_buy"
];

const MessageItem: React.FC<MessageItemProps> = ({ message, className }) => {
	const isAssistant = message.role === 'assistant';
	const baseClassName = `flex flex-col ${isAssistant ? 'self-start items-start pr-5' : 'self-end items-end pl-5'
		} ${className || ''}`;

	const bubbleClassName = `px-3 py-2 rounded-2xl  ${isAssistant ? 'bg-blue-500 text-white' : 'bg-gray-200'
		}`;

	const renderTimestamp = () => {
		if (message.id === 'abc999') return null;
		return (
			<span className="text-sm text-gray-300 mt-1">
				{new Date(message.created_at * 1000).toLocaleString()}
			</span>
		);
	};

	const renderContent = () => {
		switch (message.type) {
			case 'text':
				return (
					<>
						<div className={bubbleClassName}>
							{message.content}
							{/* <ReactMessageRenderer
								content={{
									type: 'text',
									text: message.content,
								}}
								config={defaultMessageConfig}
							/> */}
						</div>
						{renderTimestamp()}
					</>
				);
			case 'tool_call':
				const imageIndex = IMAGES.indexOf(message.content) + 1;
				return (
					<>
						{[1, 2].map((num) => (
							<React.Fragment key={num}>
								<div className={`${bubbleClassName} ${num === 2 ? 'mt-2' : ''}`}>
									<img
										className='rounded-2xl'
										src={`https://levelfeed.s3.amazonaws.com/pacha/testimonials/${imageIndex}_${num}.png`}
										alt={`Testimonial ${imageIndex}_${num}`}
									/>
								</div>
								{renderTimestamp()}
							</React.Fragment>
						))}
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className={baseClassName}>
			{renderContent()}
		</div>
	);
};

export default MessageItem;