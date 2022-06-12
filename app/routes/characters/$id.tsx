import { useLoaderData, useNavigate } from '@remix-run/react';
import type { Character } from '~/@types/Character';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { services } from '~/utils/services';
import { getCharacterByID } from '~/api/characters';
import type { Movie } from '~/@types/Movie';
import { MovieCard } from '~/components/cards/MovieCard';

export const meta: MetaFunction = ({ data }) => {
	return {
		title: `${data.name} ⏽ Remix Movie App`,
		description: `${data.name} have ${data.age} years old ${
			data.movies && `and have movies like ${data.movies[0].title}`
		}!`
	};
};

export const loader: LoaderFunction = async ({ params: { id } }) => {
	invariant(id, 'Expected a movie id');

	return getCharacterByID(id);
};

export default function CharacterInfo() {
	const character = useLoaderData<Character>();

	const navigate = useNavigate();

	return (
		<main>
			<section
				className={
					'flex h-[500px] flex-col items-center justify-center bg-black bg-opacity-75 bg-cover text-center text-white bg-blend-overlay'
				}
				style={{ backgroundImage: `url(https://source.unsplash.com/random/?abstract)` }}
			>
				<h1 className={'text-5xl font-bold'}>{character.name}</h1>

				<button
					className={
						'mt-6 max-w-fit rounded border-2 border-white bg-transparent px-4 py-2 text-xs font-bold uppercase transition-all duration-100 ease-in-out hover:bg-white hover:text-slate-800'
					}
					type={'button'}
					onClick={() => navigate(-1)}
				>
					Go Back
				</button>
			</section>

			<section className={'m-auto max-w-3xl py-8'}>
				<h2 className={'text-center text-2xl font-bold text-slate-500'}>Details</h2>

				<ul className="mt-2 flex items-center justify-center gap-6 text-center text-lg">
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
			</section>

			<h2 className={'mt-8 text-center text-2xl text-slate-500'}>
				Movies from <strong>{character.name}</strong>
			</h2>
			<section
				className={
					'm-auto grid max-w-7xl grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				}
			>
				{character.movies &&
					character.movies.map((movie: Movie) => (
						<MovieCard baseUrl={'/movies'} key={movie.id} movie={movie} />
					))}
			</section>
		</main>
	);
}
