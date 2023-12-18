export default function Banner() {
	return (
		<section
			className="min-h-full p-4 flex justify-center items-start flex-col relative pt-14"
			id="__banner">
			<div className="p-4 max-w-[800px] max-md:text-center z-10">
				<h1
					style={{
						fontFamily: "Josefin Sans"
					}}
					className="text-6xl max-md:text-5xl p-2 text-transparent font-black bg-gradient-to-r from-red-300 to-rose-600 bg-clip-text">
					SpaceX - Pushing Boundaries, Reaching Beyond
				</h1>
				<p
					style={{
						textShadow: "0 0 3px #333"
					}}
					className="text-lg p-4 text-zinc-200">
					Welcome to SpaceX, pioneers in rocket manufacturing and
					space exploration. <br />
					Join us on the journey to make life multi-planetary. Explore
					missions, witness groundbreaking feats. <br />
					SpaceX - To infinity and beyond.
				</p>
				<a
					href="#__main"
					style={{
						fontFamily: "Josefin Sans"
					}}
					className="bg-rose-500 min-w-0 text-white px-4 py-2 w-full max-w-xs rounded-full shadow-inner active:scale-95">
					See more about us
				</a>
			</div>
			<img
				src="/images/animated-rocket-launch.png"
				alt="Animated rocket launch"
				loading="eager"
				width={600}
				className="absolute bottom-0 right-0 z-0"
			/>
		</section>
	);
}
