import { GoFilter, GoSearch, GoX } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa6";
import {
	capsuleData,
	coreData,
	historyData,
	landPadData,
	missionData,
	MainAppProps
} from "../types";

const MainApp = ({
	dataFetchStatus,
	query,
	setQuery,
	setCurrentCategory,
	searchResults,
	currentCategory,
	setIsFiltersOpen,
	isFiltersOpen,
	paginationData,
	data,
	setPaginationData
}: MainAppProps) => {
	return (
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
					onSubmit={e => e.preventDefault()}
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
							disabled={dataFetchStatus !== "successful" && true}
							value={query}
							onChange={e => setQuery(e.target.value)}
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
								onClick={() => setCurrentCategory("capsules")}
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
								onClick={() => setCurrentCategory("missions")}
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
								onClick={() => setCurrentCategory("history")}
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
								onClick={() => setCurrentCategory("landpads")}
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
								onClick={() => setIsFiltersOpen(!isFiltersOpen)}
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
									{searchResults.length > 0
										? searchResults
												.reverse()
												.slice(
													(paginationData[0] - 1) *
														10,
													paginationData[0] * 10
												)
												.map(result => {
													let { item } = result;
													switch (currentCategory) {
														case "capsules":
															item =
																item as unknown as capsuleData;
															return (
																<div className="text-sm shadow-md p-4">
																	<p>
																		<b>
																			Serial
																			number:
																		</b>{" "}
																		{
																			item.capsule_serial
																		}
																	</p>
																	<p>
																		<b>
																			ID:
																		</b>{" "}
																		{
																			item.capsule_id
																		}
																	</p>
																	<p>
																		<b>
																			Status:
																		</b>{" "}
																		<span
																			className={`${
																				item.status ===
																				"active"
																					? "text-green-600"
																					: item.status ===
																					  "retired"
																					? "text-red-600"
																					: "text-yellow-600"
																			}`}>
																			{
																				item.status
																			}
																		</span>
																	</p>
																</div>
															);
														case "cores":
															item =
																item as unknown as coreData;
															return (
																<div className="text-sm shadow-md p-4">
																	<p>
																		<b>
																			Serial
																			number:
																		</b>{" "}
																		{
																			item.core_serial
																		}
																	</p>
																	<p>
																		<b>
																			Blocks:
																		</b>{" "}
																		{
																			item.block
																		}
																	</p>
																	<p>
																		<b>
																			Status:
																		</b>{" "}
																		<span
																			className={`${
																				item.status ===
																				"expended"
																					? "text-green-600"
																					: item.status ===
																					  "retired"
																					? "text-red-600"
																					: "text-yellow-600"
																			}`}>
																			{
																				item.status
																			}
																		</span>
																	</p>
																</div>
															);
														case "landpads":
															item =
																item as unknown as landPadData;
															return (
																<div
																	key={
																		item.id
																	}
																	className="flex flex-col gap-2 justify-center text-sm shadow-md p-4">
																	<p>
																		<b>
																			Name:
																		</b>{" "}
																		{
																			item.fullname
																		}
																	</p>
																	<p>
																		<b>
																			Location:
																		</b>{" "}
																		{`${item.location.name}, ${item.location.region}`}
																	</p>
																	<p>
																		<b>
																			Status:
																		</b>{" "}
																		<span
																			className={`${
																				item.status ===
																				"active"
																					? "text-green-600"
																					: item.status ===
																					  "retired"
																					? "text-red-600"
																					: "text-yellow-600"
																			}`}>
																			{
																				item.status
																			}
																		</span>
																	</p>
																</div>
															);
														case "missions":
															item =
																item as unknown as missionData;
															return (
																<div
																	key={
																		item.mission_id
																	}
																	className="flex flex-col gap-2 justify-center text-sm shadow-md p-4">
																	<p>
																		<b>
																			Name:
																		</b>{" "}
																		{
																			item.mission_name
																		}
																	</p>
																	<p>
																		<b>
																			Manufacturers:
																		</b>{" "}
																		{item?.manufacturers.toString()}
																	</p>
																</div>
															);
														case "history":
															item =
																item as unknown as historyData;
															return (
																<div
																	key={
																		item.id
																	}
																	className="flex flex-col gap-2 justify-center text-sm shadow-md p-4">
																	<p>
																		<b>
																			Title:
																		</b>{" "}
																		{
																			item.title
																		}
																	</p>
																	<p>
																		<b>
																			Date:
																		</b>{" "}
																		{new Date(
																			item.event_date_utc
																		).toTimeString()}
																	</p>
																	{item.links
																		.article && (
																		<a
																			className="text-blue-600 underline block"
																			href={
																				item
																					.links
																					.article
																			}>
																			Read
																			article
																		</a>
																	)}
																	{item.links
																		.wikipedia && (
																		<a
																			className="text-blue-600 underline block"
																			href={
																				item
																					.links
																					.wikipedia
																			}>
																			Read
																			article
																			on
																			Wikipedia
																		</a>
																	)}
																	{item.links
																		.reddit && (
																		<a
																			className="text-blue-600 underline block"
																			href={
																				item
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
												})
										: data[currentCategory]
												.slice(
													(paginationData[0] - 1) *
														10,
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
																		<b>
																			ID:
																		</b>{" "}
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
																		<b>
																			Name:
																		</b>{" "}
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
																		<b>
																			Name:
																		</b>{" "}
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
																		<b>
																			Date:
																		</b>{" "}
																		{new Date(
																			category.event_date_utc
																		).toTimeString()}
																	</p>
																	{category
																		.links
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
																	{category
																		.links
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
																	{category
																		.links
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
	);
};

export default MainApp;
