import { Movie } from '~/@types/Movie';

type Character = {
	id: string;
	name: string;
	gender: string;
	age: string;
	eye_color: string;
	hair_color: string;
	films: string[];
	movies?: Movie[];
	species: string;
	url: string;
};

type CharactersResponse = {
	characters: Character[];
};

export { Character, CharactersResponse };
