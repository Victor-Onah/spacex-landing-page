import { useEffect, useMemo, useState } from "react";
import Banner from "./components/banner";
import Header from "./components/header";
import { GoFilter, GoInfo, GoSearch, GoX } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa6";
import getSpaceXData from "./utils/spacex_data_loader";
import {
	capsuleData,
	category,
	coreData,
	historyData,
	landPadData,
	missionData,
	spaceXData
} from "./types";

function App() {
	// SpaceX data
	let [data, setData] = useState({}) as unknown as [
		spaceXData,
		React.Dispatch<React.SetStateAction<spaceXData>>
	];
	// SpaceX data fetching status
	let [dataFetchStatus, setDataFetchStatus] = useState("pending") as [
		"pending" | "failed" | "successful",
		React.Dispatch<
			React.SetStateAction<"pending" | "failed" | "successful">
		>
	];
	// Current category
	// Will be used for classification of search results and pagination
	let [currentCategory, setCurrentCategory] = useState("capsules") as [
		category,
		React.Dispatch<React.SetStateAction<category>>
	];
	// Toggles the filter available for categories that support it
	let [isFiltersOpen, setIsFiltersOpen] = useState(false) as [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	];
	// Keep track of pages for pagination
	let [paginationData, setPaginationData] = useState([0, 0]) as [
		[currentPage: number, totalPages: number],
		React.Dispatch<
			React.SetStateAction<[currentPage: number, totalPages: number]>
		>
	];

	useEffect(() => {
		getSpaceXData(setDataFetchStatus).then(data => {
			setData(data);
			setDataFetchStatus("successful");
			setPaginationData([
				1,
				Math.ceil(data[currentCategory].length / 10)
			]);
		});
	}, []);

	useEffect(() => {
		try {
			setPaginationData([
				1,
				Math.ceil(data[currentCategory].length / 10)
			]);
		} catch (error) {
			console.error(error);
		}
	}, [currentCategory]);
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
					<form
						style={{
							fontFamily: "Josefin Sans"
						}}
						className="flex m-auto max-w-3xl">
						<div className="relative flex-grow">
							<input
								className="border border-rose-800 block w-full px-4 py-1 focus-within:outline-none focus:outline-none outline-none rounded-s-full"
								type="text"
								placeholder="Search..."
								required
								id="__search-box"
								disabled={
									dataFetchStatus !== "successful" && true
								}
							/>
							<GoX
								id="__input-clear-btn"
								className="absolute right-2 top-2"
							/>
						</div>
						<button
							className="bg-rose-800 text-white flex px-2 py-1 gap-1 justify-center items-center rounded-e-full active:scale-y-95 shadow-inner"
							type="submit"
							disabled={dataFetchStatus !== "successful" && true}>
							<GoSearch /> Search
						</button>
					</form>
					<div>
						{dataFetchStatus === "successful" && (
							<header
								style={{
									fontFamily: "Josefin Sans",
									scrollSnapType: "x mandatory"
								}}
								className="flex gap-4 w-full overflow-auto p-2 border-y justify-around border-zinc-700 max-w-6xl my-8 max-[460px]:justify-start mx-auto">
								<button
									style={{
										scrollSnapAlign: "center",
										scrollSnapStop: "always"
									}}
									onClick={() =>
										setCurrentCategory("capsules")
									}
									className={`${
										currentCategory === "capsules" &&
										"bg-rose-500 text-white"
									} whitespace-nowrap active:scale-95 flex-grow block px-2 py-1 rounded-full`}>
									Capsules
								</button>
								<button
									style={{
										scrollSnapAlign: "center",
										scrollSnapStop: "always"
									}}
									onClick={() =>
										setCurrentCategory("missions")
									}
									className={`${
										currentCategory === "missions" &&
										"bg-rose-500 text-white"
									} whitespace-nowrap active:scale-95 flex-grow block px-2 py-1 rounded-full`}>
									Missions
								</button>
								<button
									style={{
										scrollSnapAlign: "center",
										scrollSnapStop: "always"
									}}
									onClick={() => setCurrentCategory("cores")}
									className={`${
										currentCategory === "cores" &&
										"bg-rose-500 text-white"
									} whitespace-nowrap active:scale-95 flex-grow block px-2 py-1 rounded-full`}>
									Cores
								</button>
								<button
									style={{
										scrollSnapAlign: "center",
										scrollSnapStop: "always"
									}}
									onClick={() =>
										setCurrentCategory("history")
									}
									className={`${
										currentCategory === "history" &&
										"bg-rose-500 text-white"
									} whitespace-nowrap active:scale-95 flex-grow block px-2 py-1 rounded-full`}>
									History
								</button>
								<button
									style={{
										scrollSnapAlign: "center",
										scrollSnapStop: "always"
									}}
									onClick={() =>
										setCurrentCategory("landpads")
									}
									className={`${
										currentCategory === "landpads" &&
										"bg-rose-500 text-white"
									} whitespace-nowrap active:scale-95 flex-grow block px-2 py-1 rounded-full`}>
									Land pads
								</button>
							</header>
						)}
						{dataFetchStatus === "successful" && (
							<div
								style={{
									fontFamily: "Josefin Sans"
								}}
								className="max-w-6xl m-auto relative">
								<button
									onClick={() =>
										setIsFiltersOpen(!isFiltersOpen)
									}
									id="__filter-btn"
									style={{
										boxShadow: "inset 0 0 2px #aaa"
									}}
									className="ml-4 flex gap-1 bg-rose-500 px-3 py-1 rounded-full text-white justify-center items-center active:scale-95 shadow">
									Filters <GoFilter />{" "}
									<span className="border-l border-zinc-200 pl-1">
										<FaAngleDown
											className={
												isFiltersOpen
													? "-rotate-180"
													: "rotate-0"
											}
										/>
									</span>
								</button>
								<div
									className={`${
										isFiltersOpen ? "scale-100" : "scale-0"
									} absolute bg-white shadow-lg flex flex-col gap-2 p-2 text-sm w-full max-w-[150px] top-11 scale-0 z-50`}>
									<button className="text-left px-3 py-1 rounded hover:bg-rose-100 transition active:scale-95">
										Active
									</button>
									<button className="text-left px-3 py-1 rounded hover:bg-rose-100 transition active:scale-95">
										Retired
									</button>
									<button className="text-left px-3 py-1 rounded hover:bg-rose-100 transition active:scale-95">
										Unknown
									</button>
								</div>
							</div>
						)}
						<div>
							{dataFetchStatus === "pending" ? (
								<span className="w-fit mt-4 block text-center m-auto animate-spin">
									<ImSpinner2 />
								</span>
							) : dataFetchStatus === "successful" ? (
								<div className="pt-8">
									<div className="grid max-[400px]:grid-cols-1 max-[600px]:grid-cols-2 max-[840px]:grid-cols-3 grid-cols-4 gap-4 max-w-5xl m-auto">
										{data[currentCategory]
											.slice(
												(paginationData[0] - 1) * 10,
												paginationData[0] * 10
											)
											.map(category => {
												switch (currentCategory) {
													case "capsules":
														category =
															category as capsuleData;
														return (
															<div className="text-sm shadow-md p-4">
																<p>
																	<b>
																		Serial
																		number:
																	</b>{" "}
																	{
																		category.capsule_serial
																	}
																</p>
																<p>
																	<b>ID:</b>{" "}
																	{
																		category.capsule_id
																	}
																</p>
																<p>
																	<b>
																		Status:
																	</b>{" "}
																	<span
																		className={`${
																			category.status ===
																			"active"
																				? "text-green-600"
																				: category.status ===
																				  "retired"
																				? "text-red-600"
																				: "text-yellow-600"
																		}`}>
																		{
																			category.status
																		}
																	</span>
																</p>
															</div>
														);
													case "cores":
														category =
															category as coreData;
														return (
															<div className="text-sm shadow-md p-4">
																<p>
																	<b>
																		Serial
																		number:
																	</b>{" "}
																	{
																		category.core_serial
																	}
																</p>
																<p>
																	<b>
																		Blocks:
																	</b>{" "}
																	{
																		category.block
																	}
																</p>
																<p>
																	<b>
																		Status:
																	</b>{" "}
																	<span
																		className={`${
																			category.status ===
																			"expended"
																				? "text-green-600"
																				: category.status ===
																				  "retired"
																				? "text-red-600"
																				: "text-yellow-600"
																		}`}>
																		{
																			category.status
																		}
																	</span>
																</p>
															</div>
														);
													case "landpads":
														category =
															category as landPadData;
														return (
															<div
																key={
																	category.id
																}
																className="flex flex-col gap-2 justify-center text-sm shadow-md p-4">
																<p>
																	<b>Name:</b>{" "}
																	{
																		category.fullname
																	}
																</p>
																<p>
																	<b>
																		Location:
																	</b>{" "}
																	{`${category.location.name}, ${category.location.region}`}
																</p>
																<p>
																	<b>
																		Status:
																	</b>{" "}
																	<span
																		className={`${
																			category.status ===
																			"active"
																				? "text-green-600"
																				: category.status ===
																				  "retired"
																				? "text-red-600"
																				: "text-yellow-600"
																		}`}>
																		{
																			category.status
																		}
																	</span>
																</p>
															</div>
														);
													case "missions":
														category =
															category as missionData;
														return (
															<div
																key={
																	category.mission_id
																}
																className="flex flex-col gap-2 justify-center text-sm shadow-md p-4">
																<p>
																	<b>Name:</b>{" "}
																	{
																		category.mission_name
																	}
																</p>
																<p>
																	<b>
																		Manufacturers:
																	</b>{" "}
																	{category.manufacturers.toString()}
																</p>
															</div>
														);
													case "history":
														category =
															category as historyData;
														return (
															<div
																key={
																	category.id
																}
																className="flex flex-col gap-2 justify-center text-sm shadow-md p-4">
																<p>
																	<b>
																		Title:
																	</b>{" "}
																	{
																		category.title
																	}
																</p>
																<p>
																	<b>Date:</b>{" "}
																	{new Date(
																		category.event_date_utc
																	).toTimeString()}
																</p>
																{category.links
																	.article && (
																	<a
																		className="text-blue-600 underline block"
																		href={
																			category
																				.links
																				.article
																		}>
																		Read
																		article
																	</a>
																)}
																{category.links
																	.wikipedia && (
																	<a
																		className="text-blue-600 underline block"
																		href={
																			category
																				.links
																				.wikipedia
																		}>
																		Read
																		article
																		on
																		Wikipedia
																	</a>
																)}
																{category.links
																	.reddit && (
																	<a
																		className="text-blue-600 underline block"
																		href={
																			category
																				.links
																				.reddit
																		}>
																		Read
																		article
																		on
																		Reddit
																	</a>
																)}
															</div>
														);
												}
											})}
									</div>
									<div className="flex justify-between max-w-4xl my-8 mx-auto">
										<button
											style={{
												fontFamily: "Josefin Sans"
											}}
											className="bg-rose-500 px-3 py-1 rounded-full disabled:bg-opacity-70 text-white active:scale-95 shadow-inner disabled:active:scale-100"
											disabled={paginationData[0] === 1}
											onClick={() =>
												setPaginationData([
													paginationData[0] - 1,
													paginationData[1]
												])
											}>
											Prev
										</button>
										<button
											style={{
												fontFamily: "Josefin Sans"
											}}
											className="bg-rose-500 px-3 py-1 rounded-full disabled:bg-opacity-70 text-white active:scale-95 shadow-inner disabled:active:scale-100"
											disabled={
												paginationData[0] ===
												paginationData[1]
											}
											onClick={() =>
												setPaginationData([
													paginationData[0] + 1,
													paginationData[1]
												])
											}>
											Next
										</button>
									</div>
								</div>
							) : (
								<p className="p-4 text-center text-sm text-zinc-500">
									Failed to load data
								</p>
							)}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}

export default App;
