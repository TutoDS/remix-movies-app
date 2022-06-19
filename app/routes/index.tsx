import type { LoaderFunction } from '@remix-run/node';
import { getMovies } from '~/api/movies';
import type { Movie, MoviesResponse } from '~/@types/Movie';
import { MovieCard } from '~/components/cards/MovieCard';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const title = url.searchParams.get('title');

	return getMovies(title);
};

export default function Home() {
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
			</section>

			<section
				className={
					'm-auto grid max-w-7xl grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				}
			>
				{movies && movies.map((movie: Movie) => <MovieCard baseUrl={'movies'}  key={movie.id} movie={movie} />)}
			</section>
		</main>
	);
}