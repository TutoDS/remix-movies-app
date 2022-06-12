import type { NavLinkProps } from '@remix-run/react';
import { NavLink } from '@remix-run/react';
import type { ReactNode } from 'react';

type Props = NavLinkProps & { children: ReactNode };

const NavItem = ({ children, ...props }: Props) => {
	return (
		<NavLink
			{...props}
			className={({ isActive }) => {
				return isActive
					? 'border-b-2 border-b-white'
					: 'border-b-2 border-b-transparent text-white hover:border-b-white';
			}}
		>
			{children}
		</NavLink>
	);
};

export { NavItem };
