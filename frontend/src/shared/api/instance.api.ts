import { FetchClient } from "../utils";


console.log(process.env.SERVER_URL);
export const api = new FetchClient({
	
	baseUrl: process.env.SERVER_URL!,
	options: {
		credentials: 'include'
	}
})
