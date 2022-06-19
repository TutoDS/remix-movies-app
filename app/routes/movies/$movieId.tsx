import type { LoaderFunction, MetaFunction , ActionFunction} from '@remix-run/node';
import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { Movie } from '~/@types/Movie';
import { getMovieByID } from '~/api/movies';
import { CharacterLabel } from '~/components/CharacterLabel';
import type { Character } from '~/@types/Character';
import { CommentsList } from '~/components/comments/List';
import { redirect } from '@remix-run/node';
import { addComment } from '~/api/comment';

export const meta: MetaFunction = ({ data }) => {
	if (data) {
		return {
			title: `${data.title} ⏽ Remix Movie App`,
			description: data.description
		};
	}

	return {
		title: 'Remix Movie App'
	};
};

export const action: ActionFunction = async ({ request, params: { movieId } }) => {
	invariant(movieId, 'Please specify the movie id!');

	const body = await request.formData();

	/**
	 * Create comment object
	 */
	const comment = {
		name: body.get('name') as string,
		message: body.get('message') as string,
		movieId
	};

	/**
	 * Basic validation
	 */
	const errors = { name: '', message: '' };

	if (!comment.name) {
		errors.name = 'Please provide your name!';
	}
	if (!comment.message) {
		errors.message = 'Please provide a comment!';
	}

	if (errors.name || errors.message) {
		const values = Object.fromEntries(body);
		return { errors, values };
	}

	await addComment(comment);

	return redirect(`/movies/${movieId}`);
};

export const loader: LoaderFunction = async ({ params: { movieId } }) => {
	invariant(movieId, 'Expected a movie id');

	return getMovieByID(movieId);
};

export default function MovieInfo() {
	const movie = useLoaderData<Movie>();

	const navigate = useNavigate();

	return (
		<main>
			<section
				className={
					'flex h-[500px] flex-col items-center justify-center bg-black bg-opacity-75 bg-cover text-center text-white bg-blend-overlay'
				}
				style={{ backgroundImage: `url(${movie.movie_banner})` }}
			>
				<h1 className={'text-5xl font-bold'}>{movie.title}</h1>
				<h2 className={'mt-2 text-xl font-light'}>{movie.release_date}</h2>

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
				<div className={'grid grid-cols-2 gap-8'}>
					<div>
						{/* Movie Description */}
						<h2 className={'mb-2 text-2xl font-bold text-slate-500'}>Description</h2>
						<p>{movie.description}</p>

						<hr className={'my-6 mx-auto block max-w-[50%] bg-slate-600 text-center'} />

						{/* Characters */}
						{movie.characters && movie.characters.length > 0 && (
							<>
								<h2 className={'mb-2 text-2xl font-bold text-slate-500'}>
									Characters
								</h2>

								<div className="flex flex-wrap gap-4">
									{movie.characters?.map((character: Character) => (
										<CharacterLabel
											baseUrl={`characters`}
											character={character}
											key={`${character.id}-${character.age}`}
										/>
									))}
								</div>
							</>
						)}
					</div>

					<div className={'flex flex-1 flex-col'}>
						<Outlet />
					</div>
				</div>
			</section>
		</main>
	);
}