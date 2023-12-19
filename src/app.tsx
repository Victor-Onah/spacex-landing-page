import { useEffect, useState } from "react";
import Banner from "./components/banner";
import Header from "./components/header";
import getSpaceXData from "./utils/spacex_data_loader";
import Fuse, { FuseResult } from "fuse.js";
import MainApp from "./components/main_app";
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
	const [data, setData] = useState({}) as unknown as [
		spaceXData,
		React.Dispatch<React.SetStateAction<spaceXData>>
	];
	// SpaceX data fetching status
	const [dataFetchStatus, setDataFetchStatus] = useState("pending") as [
		"pending" | "failed" | "successful",
		React.Dispatch<
			React.SetStateAction<"pending" | "failed" | "successful">
		>
	];
	// Current category
	// Will be used for classification of search results and pagination
	const [currentCategory, setCurrentCategory] = useState("capsules") as [
		category,
		React.Dispatch<React.SetStateAction<category>>
	];
	// Toggles the filter available for categories that support it
	const [isFiltersOpen, setIsFiltersOpen] = useState(false) as [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	];
	// Keep track of pages for pagination
	const [paginationData, setPaginationData] = useState([0, 0]) as [
		[currentPage: number, totalPages: number],
		React.Dispatch<
			React.SetStateAction<[currentPage: number, totalPages: number]>
		>
	];
	// Search query
	const [query, setQuery] = useState("");
	// Search results
	const [searchResults, setSearchResults] = useState([]) as unknown as [
		FuseResult<
			capsuleData | landPadData | historyData | coreData | missionData
		>[],
		React.Dispatch<
			React.SetStateAction<
				FuseResult<
					| capsuleData
					| landPadData
					| historyData
					| coreData
					| missionData
				>[]
			>
		>
	];

	useEffect(() => {
		getSpaceXData(setDataFetchStatus)
			.then(data => {
				setData(data);
				setDataFetchStatus("successful");
				setPaginationData([
					1,
					Math.ceil(data[currentCategory].length / 10)
				]);
			})
			.catch(() => setDataFetchStatus("failed"));
	}, []);

	useEffect(() => {
		try {
			setPaginationData([
				1,
				searchResults.length > 0
					? Math.ceil(searchResults.length / 10)
					: Math.ceil(data[currentCategory].length / 10)
			]);
			const fuse = new Fuse(
				data[currentCategory] as unknown as typeof searchResults,
				{
					keys: [
						"capsule_serial",
						"capsule_id",
						"original_launch",
						"original_launch_unix",
						"missions",
						"landings",
						"type",
						"details",
						"reuse_count",
						"core_serial",
						"block",
						"status",
						"original_launch",
						"original_launch_unix",
						"rtls_attempts",
						"rtls_landings",
						"asds_attempts",
						"asds_landings",
						"water_landing",
						"id",
						"title",
						"event_date_utc",
						"event_date_unix",
						"flight_number",
						"links",
						"fullname",
						"location",
						"landing_type",
						"successful_landings",
						"attempted_landings",
						"wikipedia"
					]
				}
			);
			setSearchResults(fuse.search(query.trim()));
			return () => {
				setSearchResults([]);
			};
		} catch (error) {
			console.error(error);
		}
	}, [currentCategory, query, data]);

	return (
		<main id="__spacex-landing-page" className="h-[100vh] overflow-auto">
			<Header />
			<Banner />
			<MainApp
				{...{
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
				}}
			/>
		</main>
	);
}

export default App;
