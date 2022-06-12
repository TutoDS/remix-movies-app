import type { Movie } from '~/@types/Movie';
import { json } from '@remix-run/node';
import { services } from '~/utils/services';
import type { Character } from '~/@types/Character';

const getCharacters = async (name?: string | null) => {
	const response = await fetch(`${services.moviesApi}/people`);

	const characters: Character[] = await response.json();

	if (name) {
		return json({
			characters: characters.filter((character) =>
				character.name.toLowerCase().includes(name.toLowerCase())
			)
		});
	}

	return json({ characters });
};

const getCharacterByID = async (id: string) => {
	const response = await fetch(`${services.moviesApi}/people/${id}`);

	const character: Character = await response.json();

	/**
	 * Get characters info, fetching using
	 * the string on people array
	 */
	const movies: Movie[] = await Promise.all(
		character.films
			.filter((url: string) => `${services.moviesApi}/films/` !== url)
			.map((url: string) => fetch(url).then((res) => res.json()))
	);

	return json({ ...character, movies });
};

export { getCharacters, getCharacterByID };
