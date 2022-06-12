import { NavItem } from '~/components/Header/partials/NavItem';
import { useEffect, useState } from 'react';

const Header = () => {
	const [headerClassName, setHeaderClassName] = useState('');

	const handleScroll = (headerClassName: string) => {
		if (window.scrollY >= 100) {
			setHeaderClassName('bg-slate-900');
		} else {
			setHeaderClassName('');
		}
	};

	useEffect(() => {
		window.onscroll = () => handleScroll(headerClassName);
	}, [headerClassName]);

	return (
		<header className={`${headerClassName} fixed top-0 w-full`}>
			<div
				className={
					'm-auto flex h-[80px] max-w-7xl items-center justify-between gap-4 py-2 text-white'
				}
			>
				<span className={'text-xl font-bold'}>Movies</span>
				<nav className={'flex items-center gap-6'}>
					<NavItem to={'/'}>Home</NavItem>
					<NavItem to={'/movies'}>Movies</NavItem>
					<NavItem to={'/characters'}>Characters</NavItem>
				</nav>
			</div>
		</header>
	);
};

export { Header };
