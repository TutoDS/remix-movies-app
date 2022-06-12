import type { Character } from '~/@types/Character';
import type { Comment } from '~/@types/Comment';

type Movie = {
	id: string;
	title: string;
	original_title: string;
	original_title_romanised: string;
	description: string;
	director: string;
	producer: string;
	release_date: string;
	rt_score: string;
	people: string[];
	characters?: Character[];
	species: string[];
	locations: string[];
	vehicles: string[];
	url: string;
	image: string;
	movie_banner: string;
	comments: Comment[];
};

type MoviesResponse = {
	movies: Movie[];
};

export { Movie, MoviesResponse };
