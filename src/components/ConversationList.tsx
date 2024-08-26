import { ConversationItem } from './ConversationItem';
import { LoadingAnimation } from './interface/Loading';
import { useContext, useEffect, useRef, useState } from 'react';
import { DashboardContext, loadConvs } from '../utils';
import InfiniteScroll from 'react-infinite-scroll-component';


export interface ConversationType {
	id: string,
	name: string;
	number: string;
	threadID: string;
	created_at: string;
}


export const ConversationList = () => {
	const [page, setPage] = useState<number>(0);

	const [conversationList, setConversationList] = useState<ConversationType[]>([])

	const [isLoadingConversations, setIsLoadingConversations] = useState(false)

	const [hadMoreConvs, setHadMoreConvs] = useState<boolean>(true)

	const [loadMoreFlag, setLoadMoreFlag] = useState(false)

	const [dataLength, setDataLength] = useState(0)

	const updateThreadId = useContext(DashboardContext)?.updateThreadId
	const selectedThreadId = useContext(DashboardContext)?.selectedThreadId

	const getToAndFrom = () => {
		const ITEMS_PER_PAGE = 20
		let from = page * ITEMS_PER_PAGE;
		let to = from + ITEMS_PER_PAGE;
		if (page > 0) {
			from += 1
		}
		return { from, to }
	}


	// useEffect(() => {
	// 	setIsLoadingConversations(true)
	// 	const { from, to } = getToAndFrom();
	// 	loadConvs(from, to).then(data => {
	// 		console.log("cl",data)
	// 		console.log("convL",conversationList)
	// 		console.log(data.data.length + conversationList.length)
	// 		const count = data.count || 0
	// 		setDataLength(count)
	// 		setHadMoreConvs(data.data.length + conversationList.length >= count);
	// 		// if (data.data.length + conversationList.length >= count) {
	// 		// 	setHadMoreConvs(false)
	// 		// }
	// 		setPage(prev => prev + 1)
	// 		setConversationList(prev => [...prev, ...data.data])
	// 	}).catch(e => { }).finally(() => {
	// 		setHadMoreConvs(false)
	// 		setIsLoadingConversations(false)
	// 	})
	// }, [loadMoreFlag])

	useEffect(() => {
		setIsLoadingConversations(true);
		const { from, to } = getToAndFrom();

		loadConvs(from, to).then(data => {
			const count = data.count || 0;

			// Update hadMoreConvs to true if there's still data to fetch
			setHadMoreConvs(data.data.length > 0 && (data.data.length + conversationList.length < count));

			// Update dataLength based on how many conversations were fetched
			setDataLength(prev => prev + data.data.length);

			// Increment the page count
			setPage(prev => prev + 1);

			// Append new conversations to the existing list
			setConversationList(prev => [...prev, ...data.data]);
		}).catch(e => {
			console.error(e);
		}).finally(() => {
			setIsLoadingConversations(false);
		});
	}, [loadMoreFlag]);

	const handleClickConversation = async (threadId: string) => {
		updateThreadId?.(threadId)
	}


	const observerTarget = useRef<HTMLDivElement>(null);
	return (
		<aside id='conversationListContainer' className="w-full flex-col flex flex-1 rounded-md border border-zinc-200 overflow-auto">

			{/* <InfiniteScroll
				dataLength={dataLength}
				next={() => { setLoadMoreFlag(!loadMoreFlag); }}
				loader={<h4></h4>}
				hasMore={hadMoreConvs}
				scrollableTarget='conversationListContainer'
			> */}
			<InfiniteScroll
				dataLength={dataLength} // This should reflect the number of conversations loaded
				next={() => setLoadMoreFlag(prev => !prev)} // Trigger loading more
				hasMore={hadMoreConvs}  // Whether more conversations are available
				loader={<h4></h4>}  // Loading indicator
				scrollableTarget='conversationListContainer'  // Target for scrolling
			>
				<div className={`flex flex-col items-center w-full divide-y-2 bg-white`}>
					{conversationList.map((conversation) => (
						<button
							className="w-full"
							onClick={() => { handleClickConversation(conversation.threadID) }}
							key={conversation.id}
						>
							<ConversationItem
								conversation={conversation}
								userName={conversation.name}
								isSelected={
									conversation.threadID === selectedThreadId
								}
							/>
						</button>
					))}
					<div ref={observerTarget} />
				</div>
			</InfiniteScroll>

			{!hadMoreConvs && (
				<div className="rounded-md p-2 m-3 text-center border-2 font-medium">
					No more conversations
				</div>
			)}

			{isLoadingConversations && (
				<div className="self-center bg-zinc-200 p-6 text-lg font-medium rounded-md my-auto flex flex-col items-center gap-5">
					<LoadingAnimation label="Loading messages..." className='w-5 h-5' />
					Loading conversations...
				</div>
			)}
		</aside>
	);
};
