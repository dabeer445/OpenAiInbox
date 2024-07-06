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


	useEffect(() => {
		setIsLoadingConversations(true)
		const { from, to } = getToAndFrom();
		loadConvs(from, to).then(data => {
			const count = data.count || 0
			setDataLength(count)

			console.log(data.data.length + conversationList.length)
			if (data.data.length + conversationList.length >= count) {
				setHadMoreConvs(false)
			}
			setPage(prev => prev + 1)
			setConversationList(prev => [...prev, ...data.data])
		}).catch(e => { }).finally(() => {
			setIsLoadingConversations(false)
		})
	}, [loadMoreFlag])

	const handleClickConversation = async (threadId: string) => {
		updateThreadId?.(threadId)
	}


	const observerTarget = useRef<HTMLDivElement>(null);
	return (
		<aside id='conversationListContainer' className="w-full flex-col flex flex-1 rounded-md border border-zinc-200 overflow-auto">



			{/* {
				hadMoreConvs && <div className='cursor-pointer' onClick={() => {
					setLoadMoreFlag(!loadMoreFlag)
				}}>
					Load More
				</div>
			} */}
			<InfiniteScroll dataLength={dataLength} next={() => { setLoadMoreFlag(!loadMoreFlag) }} loader={<h4>Loading</h4>} hasMore={hadMoreConvs} scrollableTarget='conversationListContainer' >
				<div
					className={`flex flex-col  items-center w-full divide-y-2 bg-white`}
				>

					{conversationList
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

			{/* {!hasMoreConversations && (
				<div className="rounded-md p-2 m-3 text-center border-2 font-medium">
					No more conversations
				</div>
			)} */}

			{isLoadingConversations && (
				<div className="self-center bg-zinc-200 p-6 text-lg font-medium rounded-md my-auto flex flex-col items-center gap-5">
					<LoadingAnimation label="Loading messages..." />
					Loading conversations...
				</div>
			)}
		</aside>
	);
};
