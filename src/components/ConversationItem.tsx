import defaultAvatarImg from '../assets/default-avatar.png';
import differenceInDays from 'date-fns/differenceInDays';
import { getCountLabel } from '../utils';
import { ConversationWithMessages } from '../pages/Dashboard';

interface ConversationItemProps {
	conversation: ConversationWithMessages;
	userName: string;
	isSelected?: boolean;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
	conversation,
	userName,
	isSelected,
}) => {
	return (
		<div
			className={`flex items-center px-5 py-4 ${isSelected ? 'bg-zinc-200' : ''
				}`}
		>
			{/* Placeholder rounded profile pic */}
			<img
				src={defaultAvatarImg}
				className="w-10 h-10 rounded-full mr-2"
			/>
			{/* User name */}
			<p className="flex flex-col items-start leading-none">
				<span className="font-medium">{userName}</span>
				<span className="text-sm text-gray-400">
					{getCountLabel(
						differenceInDays(
							new Date(),
							new Date(conversation.created_at)
						),
						'day ago',
						'days ago',
						'Today',
						true
					)}
				</span>
			</p>
			{/* Badge with channel name */}
			<span
				className={`ml-auto px-2 py-1 rounded-full ${conversation.integration === 'whatsapp'
					? 'bg-green-500'
					: conversation.integration === 'telegram'
						? 'bg-blue-500'
						: 'bg-gray-500'
					} text-white text-xs`}
			>
				{conversation.integration}
			</span>
		</div>
	);
};
