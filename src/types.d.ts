import { FuseResult } from "fuse.js";

export type category =
	| "capsules"
	| "cores"
	| "history"
	| "landpads"
	| "missions";
export type capsuleData = {
	capsule_serial: string;
	capsule_id: string;
	status: "active" | "retired" | "unknown";
	original_launch: string | null;
	original_launch_unix: number | null;
	missions: { name: string; flight: number }[];
	landings: 1;
	type: string;
	details: string | null;
	reuse_count: number;
};
export type coreData = {
	core_serial: string;
	block: number;
	status: "expended" | "destroyed" | "retired";
	original_launch: string | null;
	original_launch_unix: number | null;
	missions: { name: string; flight: number }[];
	reuse_count: number;
	rtls_attempts: number;
	rtls_landings: number;
	asds_attempts: number;
	asds_landings: number;
	water_landing: boolean;
	details: string | null;
};
export type historyData = {
	id: number;
	title: string;
	event_date_utc: string;
	event_date_unix: number;
	flight_number: number | null;
	details: string;
	links: {
		reddit: string | null;
		wikipedia: string | null;
		article: string | null;
	};
};
export type landPadData = {
	id: string;
	fullname: string;
	status: "active" | "retired";
	location: {
		name: string;
		region: string;
		latittude: number;
		longitude: number;
	};
	landing_type: string;
	successful_landings: number;
	attempted_landings: number;
	wikipedia: string | null;
	details: string;
};
export type missionData = {
	mission_id: string;
	mission_name: string;
	manufacturers: string[];
	payloads: string[];
	wikipedia: string | null;
	website: string | null;
	twitter: string | null;
	description: string;
};
export type spaceXData = {
	capsules: capsuleData[];
	missions: missionData[];
	landpads: landPadData[];
	history: historyData[];
	cores: coreData[];
};
export type MainAppProps = {
	dataFetchStatus: "pending" | "failed" | "successful";
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	setCurrentCategory: React.Dispatch<React.SetStateAction<category>>;
	searchResults: FuseResult<
		capsuleData | landPadData | historyData | coreData | missionData
	>[];
	currentCategory: category;
	setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isFiltersOpen: boolean;
	paginationData: [number, number];
	data: spaceXData;
	setPaginationData: React.Dispatch<React.SetStateAction<[number, number]>>;
};
