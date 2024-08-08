import { SignInButton } from '@clerk/clerk-react';

export function LoginPage() {

	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<div className="flex flex-col items-center justify-center ring-1 ring-neutral-200 bg-white p-5 rounded-xl shadow-lg">


				<h1 className='text-2xl tracking-tight font-extrabold'>
					Let's check your inbox
				</h1>
				<p className='my-3 text-neutral-700'>
					Click the button below, enter the credentials provided to you.
				</p>

				<SignInButton mode="modal" children={<div className='bg-neutral-200 ring-1 ring-neutral-300 rounded-2xl text-xl font-bold px-10 py-2 drop-shadow-2xl cursor-pointer active:scale-95 transition-transform'>Login</div>} />
			</div>
		</div>
	);
}
