import { Link } from '@remix-run/react';
import type { Movie } from '~/@types/Movie';

type Props = {
	movie: Movie;
	baseUrl?: string;
};

const MovieCard = ({ movie, baseUrl }: Props) => {
	return (
		<Link
			to={baseUrl ? `${baseUrl}/${movie.id}` : movie.id}
			style={{ backgroundImage: `url(${movie.image})` }}
			className={
				'flex h-[400px] flex-col justify-end gap-4 bg-black bg-opacity-75 bg-cover px-6 pt-6 pb-8 text-white bg-blend-overlay transition-all duration-75 ease-in-out hover:bg-opacity-50'
			}
		>
			<div>
				<h3 className={'font-bold'}>{movie.title}</h3>
				<p
					className={
						'max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-300'
					}
				>
					{movie.description}
				</p>
			</div>

			<button
				type={'button'}
				className={
					'max-w-fit rounded border-2 border-white bg-transparent px-4 py-2 text-xs font-bold uppercase transition-all duration-100 ease-in-out hover:bg-white hover:text-slate-800'
				}
			>
				Movie Details
			</button>
		</Link>
	);
};

export { MovieCard };
