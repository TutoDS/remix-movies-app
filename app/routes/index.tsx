export default function Index() {
	return (
		<main>
			<section
				style={{ backgroundImage: `url(https://source.unsplash.com/random/?abstract)` }}
				className={
					'flex h-[500px] flex-col items-center justify-center gap-4 bg-black bg-opacity-75 bg-cover bg-no-repeat bg-blend-overlay'
				}
			>
				<h1 className={'text-center text-5xl font-bold text-white'}>List of Movies</h1>
			</section>
		</main>
	);
}
