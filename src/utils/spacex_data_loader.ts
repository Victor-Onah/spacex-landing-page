import {
	capsuleData,
	coreData,
	historyData,
	landPadData,
	missionData,
	spaceXData
} from "../types";

/** Load the SpaceX data from the API endpoint once, cache it and use it through out the application */
async function getSpaceXData(
	setLoadStatus: React.Dispatch<
		React.SetStateAction<"pending" | "failed" | "successful">
	>
): Promise<spaceXData> {
	/** An array of API endpoints */
	// const apiEndpoints: string[] = [
	// 	"https://api.spacexdata.com/v3/missions",
	// 	"https://api.spacexdata.com/v3/capsules",
	// 	"https://api.spacexdata.com/v3/cores",
	// 	"https://api.spacexdata.com/v3/history",
	// 	"https://api.spacexdata.com/v3/landpads"
	// ];
	// let spaceXData: spaceXData = {
	// 	missions: [],
	// 	capsules: [],
	// 	cores: [],
	// 	history: [],
	// 	landpads: []
	// };
	// for (let i = 0; i < apiEndpoints.length; i++) {
	// 	try {
	// 		let response = await fetch(apiEndpoints[i]);
	// 		if (i === 1) {
	// 			let data = (await response.json()) as unknown as missionData[];
	// 			spaceXData.missions = data;
	// 		} else if (i === 2) {
	// 			let data = (await response.json()) as unknown as capsuleData[];
	// 			spaceXData.capsules = data;
	// 		} else if (i === 3) {
	// 			let data = (await response.json()) as unknown as coreData[];
	// 			spaceXData.cores = data;
	// 		} else if (i === 4) {
	// 			let data = (await response.json()) as unknown as historyData[];
	// 			spaceXData.history = data;
	// 		} else {
	// 			let data = (await response.json()) as unknown as landPadData[];
	// 			spaceXData.landpads = data;
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	// return spaceXData;
	return (await (await fetch("/data.json")).json()) as spaceXData;
}

export default getSpaceXData;
