import { Link } from '@remix-run/react';
import type { Character } from '~/@types/Character';

type Props = {
	character: Character;
	baseUrl?: string;
};

const CharacterLabel = ({ character, baseUrl }: Props) => {
	return (
		<Link
			to={baseUrl ? `${baseUrl}/${character.id}` : character.id}
			className={
				'rounded-lg border-2 border-slate-400 p-2 text-slate-400 transition-all duration-100 ease-in-out hover:border-slate-700 hover:bg-slate-200 hover:text-slate-800'
			}
		>
			{character.name}
		</Link>
	);
};

export { CharacterLabel };
