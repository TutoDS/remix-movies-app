import { Form, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { getCharacters } from '~/api/characters';
import type { Character, CharactersResponse } from '~/@types/Character';
import { CharacterLabel } from '~/components/CharacterLabel';

export const meta: MetaFunction = () => {
	return {
		title: 'Characters ⏽ Remix Movie App'
	};
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const name = url.searchParams.get('name');

	return getCharacters(name);
};

export default function CharactersIndex() {
	const { characters } = useLoaderData<CharactersResponse>();

	return (
		<main>
			<section
				style={{ backgroundImage: `url(https://source.unsplash.com/random/?abstract)` }}
				className={
					'flex h-[500px] flex-col items-center justify-center gap-4 bg-black bg-opacity-75 bg-cover bg-no-repeat bg-blend-overlay'
				}
			>
				<h1 className={'text-center text-5xl font-bold text-white'}>List of Characters</h1>

				<Form method={'get'} className={'flex items-center justify-center gap-2'}>
					<input
						type="text"
						name={'name'}
						placeholder={'Type to search a character...'}
						className={
							'border-b-2 border-slate-400 bg-transparent p-1 text-center text-slate-200 focus:border-slate-200 focus:outline-none'
						}
					/>
					<button
						type="submit"
						className={
							'border-0 bg-transparent text-sm font-bold uppercase text-slate-400 shadow-none transition-all duration-100 ease-in-out hover:text-slate-200'
						}
					>
						Search
					</button>
				</Form>
			</section>

			<section className={'m-auto flex max-w-7xl grid-cols-1 flex-wrap gap-4 py-8'}>
				{characters &&
					characters.map((character: Character) => (
						<CharacterLabel
							character={character}
							key={`${character.id}-${character.age}`}
						/>
					))}
			</section>
		</main>
	);
}
