// import { useState } from "react";
import Banner from "./components/banner";
import Header from "./components/header";
import { GoSearch, GoX } from "react-icons/go";

function App() {
	return (
		<main id="__spacex-landing-page" className="h-[100vh] overflow-auto">
			<Header />
			<Banner />
			<section id="__main" className="min-h-full pt-16">
				<div className="p-2">
					<h2
						style={{
							fontFamily: "Josefin Sans"
						}}
						className="text-rose-600 font-black text-2xl text-center mb-6">
						Search
					</h2>
					<form className="flex m-auto max-w-3xl">
						<div className="relative flex-grow">
							<input
								className="border border-rose-800 block w-full px-4 py-1 focus-within:outline-none focus:outline-none outline-none rounded-s-full"
								type="text"
								placeholder="Search..."
								required
							/>
							<GoX className="absolute right-2 top-2" />
						</div>
						<button
							className="bg-rose-800 text-white flex px-2 py-1 gap-1 justify-center items-center rounded-e-full active:scale-y-95 shadow-inner"
							type="submit">
							<GoSearch /> Search
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}

export default App;
