import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getMovieCharacter } from '~/api/movies';

export const loader: LoaderFunction = async ({ params: { characterId } }) => {
	invariant(characterId, 'Please specify the character id');

	return getMovieCharacter(characterId);
};

export default function MovieCharacter() {
	const character = useLoaderData();

	return (
		<>
			<h2 className={'mb-4 text-2xl font-bold text-slate-500'}>Character Info</h2>

			<div className="flex flex-col rounded bg-white px-6 py-4 shadow">
				<h3 className={'text-xl font-bold'}>{character.name}</h3>
				<ul className={'mt-2 flex flex-col gap-1 text-sm'}>
					<li>
						<strong>Gender:</strong> {character.gender}
					</li>
					<li>
						<strong>Age:</strong> {character.age}
					</li>
					<li>
						<strong>Eye Color:</strong> {character.eye_color}
					</li>
					<li>
						<strong>Hair Color:</strong> {character.hair_color}
					</li>
				</ul>

				<Link
					to={`/characters/${character.id}`}
					className={
						'mt-6 max-w-fit rounded border-2 border-black bg-transparent px-4 py-2 text-xs font-bold uppercase transition-all duration-100 ease-in-out hover:border-slate-900 hover:bg-slate-900 hover:text-white'
					}
				>
					View Details
				</Link>
			</div>
		</>
	);
}
