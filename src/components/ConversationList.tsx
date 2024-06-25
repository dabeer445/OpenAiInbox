import InfiniteScroll from 'react-infinite-scroller';
import { ConversationItem } from './ConversationItem';
import { ConversationWithMessages } from '../pages/Dashboard';
import { LoadingAnimation } from './interface/Loading';
import { useRef, useState } from 'react';

interface ConversationListProps {
	conversations: ConversationWithMessages[];
	onSelectConversation: (threadId: string) => void;
	loadOlderConversations: () => Promise<void>;
	hasMoreConversations?: boolean;
	className?: string;
	selectedConversation?: string;
}

export const ConversationList = ({
	conversations,
	onSelectConversation,
	loadOlderConversations,
	hasMoreConversations,
	className,
	selectedConversation
}: ConversationListProps) => {


	const observerTarget = useRef<HTMLDivElement>(null);
	return (
		<InfiniteScroll
			pageStart={0}
			loadMore={loadOlderConversations}
			hasMore={hasMoreConversations}
			loader={
				<div
					className="loader rounded-md px-3 py-2 flex items-center gap-2 m-3 border-2 font-medium"
					key={0}
				>
					<LoadingAnimation
						label={'Loading conversations'}
						className="h-6 w-6"
					/>
					Loading older conversations...
				</div>
			}
			useWindow={false}
		>
			<div
				className={`flex flex-col  items-center w-full divide-y-2 ${className}`}
			>
				{conversations
					// if the conversation had the messages data, they could be sorted by the last message
					.sort((a, b) => {
						return (
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
						);
					})
					.map((conversation) => (
						<button
							className="w-full"
							onClick={() => onSelectConversation(conversation.threadID)}
							key={conversation.id}
						>
							<ConversationItem
								conversation={conversation}
								userName={conversation.name}
								isSelected={
									conversation.threadID === selectedConversation
								}
							/>
						</button>
					))}
				<div ref={observerTarget} />
			</div>
			{!hasMoreConversations && (
				<div className="rounded-md p-2 m-3 text-center border-2 font-medium">
					No more conversations
				</div>
			)}
		</InfiniteScroll>
	);
};
