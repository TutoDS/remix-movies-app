import { Form, useActionData, useTransition } from '@remix-run/react';

type Props = { movieId: string };

const AddComment = ({ movieId }: Props) => {
	const transition = useTransition();
	const actionData = useActionData();

	/**
	 * Classes for inputs and labels
	 */
	const getInputStyle = (fieldName: string) =>
		`w-full rounded border ${
			actionData?.errors[fieldName] ? 'border-red-700 text-red-700' : 'border-slate-400'
		} py-2 px-3`;
	const getLabelStyle = (fieldName: string) =>
		`text-xs font-bold uppercase ${
			actionData?.errors[fieldName] ? 'text-red-700' : 'text-slate-500'
		}`;

	return (
		<div className={'rounded border border-slate-400 p-4'}>
			<Form method={'post'} action={`/movies/${movieId}`}>
				<fieldset disabled={transition.state === 'submitting'}>
					<label htmlFor={'name'} className={getLabelStyle('name')}>
						Name
					</label>
					<input
						type={'text'}
						id={'name'}
						name={'name'}
						className={getInputStyle('name')}
					/>
					{actionData?.errors.name && (
						<small className={'block text-red-700'}>{actionData?.errors.name}</small>
					)}
				</fieldset>
				<fieldset className={'mt-2'} disabled={transition.state === 'submitting'}>
					<label htmlFor={'message'} className={getLabelStyle('message')}>
						Message
					</label>
					<textarea
						id={'message'}
						name={'message'}
						className={getInputStyle('message')}
					></textarea>
					{actionData?.errors.message && (
						<small className={'block text-red-700'}>{actionData?.errors.message}</small>
					)}
				</fieldset>

				<button
					type="submit"
					className={
						'mt-6 rounded border-2 border-slate-400 bg-transparent px-2 py-1 text-sm font-bold uppercase text-slate-400 shadow-none transition-all duration-100 ease-in-out hover:border-slate-700 hover:bg-slate-700 hover:text-slate-100'
					}
				>
					{transition.state === 'submitting' ? 'Adding...' : 'Add Comment'}
				</button>
			</Form>
		</div>
	);
};

export { AddComment };
