import type { Movie } from '~/@types/Movie';
import { json } from '@remix-run/node';
import { services } from '~/utils/services';
import { Character } from '~/@types/Character';
import { getCommentsByMovie } from '~/api/comment';

const getMovies = async (title?: string | null) => {
	/**
	 * Base API url
	 * https://ghibliapi.herokuapp.com
	 */
	const response = await fetch(`${services.moviesApi}/films`);

	const movies: Movie[] = await response.json();

	if (title) {
		return json({
			movies: movies.filter((movie) =>
				movie.title.toLowerCase().includes(title.toLowerCase())
			)
		});
	}

	return json({ movies });
};

const getMovieByID = async (id: string) => {
	const response = await fetch(`${services.moviesApi}/films/${id}`);

	const movie: Movie = await response.json();

	/**
	 * Get Movie Comments
	 */
	const comments = await getCommentsByMovie(id);

	/**
	 * Get characters info, fetching using
	 * the string on people array
	 */
	const characters: Character[] = await Promise.all(
		movie.people
			.filter((url: string) => `${services.moviesApi}/people/` !== url)
			.map((url: string) => fetch(url).then((res) => res.json()))
	);

	return json({ ...movie, comments, characters });
};

const getMovieCharacter = async (id: string) => {
	const response = await fetch(`${services.moviesApi}/people/${id}`);

	if (!response.ok) {
		throw response;
	}

	const character: Character = await response.json();

	return json(character);
};

export { getMovies, getMovieCharacter, getMovieByID };
