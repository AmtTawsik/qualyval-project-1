import * as Realm from "realm-web";

export const useMyRealmApp = () => {
	const appId = useRuntimeConfig().public.APP_ID;

	const app = new Realm.App({
		id: appId,
	});

	async function graphqlOperation(graphql) {
		await currentUser.refreshAccessToken();
		let resData = null;
		const graphqlAPI = useRuntimeConfig().public.GRAPHQL_API;

		let requestOptions = {
			method: "post",
			maxBodyLength: Infinity,
			url: graphqlAPI,
			headers: {
				Authorization: `Bearer ${currentUser._accessToken}`,
				"Content-Type": "application/json",
			},
			data: graphql,
		};

		await axios(requestOptions)
			.then((response) => response.data)
			.then((result) => {
				resData = result.data;
			})
			.catch((error) => {
				resData = null;
				console.log("error", error.response);
				if (error.response.status === 401) navigateTo("/");
			});

		return resData;
	}


	return {
		app,
		Realm,
		graphqlOperation,
	};
};
// http://mongoauthtest.s3-website.eu-west-2.amazonaws.com/