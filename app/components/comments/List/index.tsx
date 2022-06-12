import type { Comment } from '~/@types/Comment';
import { AddComment } from '~/components/comments/Add';

type Props = {
	movieId: string;
	comments: Comment[];
};

const CommentsList = ({ movieId, comments }: Props) => {
	return (
		<>
			<h2 className={'mb-2 mt-8 text-2xl font-bold text-slate-500'}>Comments</h2>

			<div className={'my-3 flex flex-col gap-4'}>
				{comments.length > 0 &&
					comments.map((comment) => (
						<div
							key={`${comment.name.toLowerCase().split(' ').join('-')}-${comment.id}`}
							className={'rounded border border-slate-400 p-4'}
						>
							<div className={'text-xl font-bold text-gray-700'}>{comment.name}</div>
							<p className={'text-gray-700'}>{comment.message}</p>
						</div>
					))}

				<AddComment movieId={movieId} />
			</div>
		</>
	);
};

export { CommentsList };
