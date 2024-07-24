import axios from "axios";
import { createContext } from "react";

export function getNumberEmoji(number: number) {
	if (number <= 10) {
		switch (number) {
			case 0:
				return '0️⃣';
			case 1:
				return '1️⃣';
			case 2:
				return '2️⃣';
			case 3:
				return '3️⃣';
			case 4:
				return '4️⃣';
			case 5:
				return '5️⃣';
			case 6:
				return '6️⃣';
			case 7:
				return '7️⃣';
			case 8:
				return '8️⃣';
			case 9:
				return '9️⃣';
			case 10:
				return '🔟';
			default:
				return '❓';
		}
	} else {
		let numberString = number.toString();
		let numberEmoji = '';
		for (let i = 0; i < numberString.length; i++) {
			switch (numberString[i]) {
				case '0':
					numberEmoji += '0️⃣';
					break;
				case '1':
					numberEmoji += '1️⃣';
					break;
				case '2':
					numberEmoji += '2️⃣';
					break;
				case '3':
					numberEmoji += '3️⃣';
					break;
				case '4':
					numberEmoji += '4️⃣';
					break;
				case '5':
					numberEmoji += '5️⃣';
					break;
				case '6':
					numberEmoji += '6️⃣';
					break;
				case '7':
					numberEmoji += '7️⃣';
					break;
				case '8':
					numberEmoji += '8️⃣';
					break;
				case '9':
					numberEmoji += '9️⃣';
					break;
				default:
					numberEmoji += '❓';
					break;
			}
		}
		return numberEmoji;
	}
}

export function getCountLabel(
	count: number,
	singular: string,
	plural: string,
	none: string,
	showCount?: boolean
) {
	return count === 0
		? none
		: `${showCount ? `${count} ` : ''}${count === 1 ? singular : plural}`;
}

export function isDefinedAndHasItems<T>(array: T[] | undefined): boolean {
	return array !== undefined && array.length > 0;
}

export function isNumberDefined(number: any): number is number {
	return number !== undefined && number !== null;
}

export function isBooleanDefined(bool: any): bool is boolean {
	return bool !== undefined && bool !== null;
}

export interface dashboardContextType {
	selectedThreadId: string;
	updateThreadId: (threadId: string) => void;
}

export const MESSAGES_PAGE_SIZE = 35

export const DashboardContext = createContext<dashboardContextType | undefined>(undefined);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
export const loadConvs = async (from: number, to: number, token: string | null) => {
	try {
		const res = await axios.get(`${BACKEND_URL}/getconversations`, { params: { from, to }, headers: { Authorization: `Bearer ${token}` } })
		return res?.data?.data ?? { data: [], count: 0 }
	} catch (error) {
		console.error('Problem fetching conversations.')
	}
	// const { data, count, error } = await supabase
	// 	.from('Conversations')
	// 	.select('*', { count: 'exact' }).range(from, to).order('created_at', { ascending: false })
	// if (error) throw error;
	// return { data, count };
};


// const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API, dangerouslyAllowBrowser: true });
export const fetchMessagesFromOpenAI = async (threadID: string, before: string, token: string | null): Promise<any> => {
	try {
		const res = await axios.get(`${BACKEND_URL}/getmessages`, { params: { threadID, before }, headers: { Authorization: `Bearer ${token}` } })
		return res?.data?.data ?? []
	} catch (error) {
		console.error('Problem fetching messages.')
	}
	// const threadMessages = await openai.beta.threads.messages.list(threadID, { limit: MESSAGES_PAGE_SIZE, order: "desc", after: before });
	// return threadMessages.data;
};


export const FIRST_MESSAGE = 'Bonjour! Je suis Julie de l’équipe Pacha, la litière qui change de couleur ! J’ai vu que vous vous intéressiez à notre litière ! C’est adorable merci ! Comment allez-vous aujourd’hui ? '