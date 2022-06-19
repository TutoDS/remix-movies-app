import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import type { Movie, MoviesResponse } from '~/@types/Movie';
import { getMovies } from '~/api/movies';
import { MovieCard } from '~/components/cards/MovieCard';

export const meta: MetaFunction = () => {
	return {
		title: 'Movies ⏽ Remix Movie App'
	};
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const title = url.searchParams.get('title');

	return getMovies(title);
};

export default function Movies() {
	const { movies } = useLoaderData<MoviesResponse>();

	return (
		<main>
			<section
				style={{ backgroundImage: `url(https://source.unsplash.com/random/?abstract)` }}
				className={
					'flex h-[500px] flex-col items-center justify-center gap-4 bg-black bg-opacity-75 bg-cover bg-no-repeat bg-blend-overlay'
				}
			>
				<h1 className={'text-center text-5xl font-bold text-white'}>List of Movies</h1>

				<Form method={'get'} className={'flex items-center justify-center gap-2'}>
					<input
						type="text"
						name={'title'}
						placeholder={'Type to search a movie...'}
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

			<section
				className={
					'm-auto grid max-w-7xl grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				}
			>
				{movies && movies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)}
			</section>
		</main>
	);
}