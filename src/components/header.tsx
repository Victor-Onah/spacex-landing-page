export default function Header() {
	return (
		<header
			style={{
				backdropFilter: "blur(10px)"
			}}
			className="fixed top-0 w-full left-0 bg-transparent right-0 z-50 p-4 text-center">
			<h3
				style={{
					fontFamily: "Josefin Sans"
				}}
				className="text-lg text-transparent font-black bg-gradient-to-r from-red-300 to-rose-600 bg-clip-text">
				<a href="#__banner">SpaceX</a>
			</h3>
		</header>
	);
}
