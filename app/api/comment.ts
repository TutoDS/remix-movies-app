import { services } from '~/utils/services';
import type { Comment } from '~/@types/Comment';

const getCommentsByMovie = async (movieId: string) => {
	const response = await fetch(`${services.commentsApi}/comments?movieId=${movieId}`);

	if (!response.ok) {
		throw response;
	}

	const comments: Comment[] = await response.json();

	return comments;
};

const addComment = async (comment: Comment) => {
	const response = await fetch(`${services.commentsApi}/comments`, {
		method: 'POST',
		body: JSON.stringify(comment),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		throw response;
	}

	return response.json();
};

export { getCommentsByMovie, addComment };
