import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch
} from '@remix-run/react';

import tailwindStyles from '~/styles/tailwind.css';
import globalStyles from '~/styles/global.css';
import { Header } from '~/components/Header';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: tailwindStyles },
		{ rel: 'stylesheet', href: globalStyles }
	];
};

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Remix Movie App',
	viewport: 'width=device-width,initial-scale=1'
});

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<html>
			<head>
				<title>{caught.status} ⏽ Remix Movie App</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className="mx-auto my-4 flex max-w-2xl flex-col rounded border-2 border-orange-700 bg-orange-100 p-2 text-slate-800">
					<h2 className={'text-xl font-bold'}>{caught.status}</h2>
					<p>{caught.statusText}</p>

					<Link
						to={'/'}
						className={
							'mt-4 max-w-fit rounded border-2 border-slate-600 bg-transparent px-2 py-1 text-sm text-slate-600 transition-all duration-100 ease-in-out hover:border-slate-800 hover:bg-slate-800 hover:text-white'
						}
					>
						Go To Home
					</Link>
				</div>
				<Scripts />
			</body>
		</html>
	);
}

// @ts-ignore
export function ErrorBoundary({ error }) {
	return (
		<html>
			<head>
				<title>Oh No! ⏽ Remix Movie App</title>
				<Meta />
				<Links />
			</head>
			<body>
				<div className="mx-auto my-4 flex max-w-2xl flex-col rounded border-2 border-red-700 bg-red-100 p-2 text-slate-800">
					<h2 className={'text-xl font-bold'}>Something went wrong!</h2>
					<p>{error.message}</p>

					<Link
						to={'/'}
						className={
							'mt-4 max-w-fit rounded border-2 border-slate-600 bg-transparent px-2 py-1 text-sm text-slate-600 transition-all duration-100 ease-in-out hover:border-slate-800 hover:bg-slate-800 hover:text-white'
						}
					>
						Go To Home
					</Link>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
