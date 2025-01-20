declare global {
	namespace Server {
		type APICall<TBody = any> = {
			method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
			endpoint?: string;
			body?: TBody;
			queryParams?: URLSearchParams;
			includeCredentials?: boolean;
			mode?: RequestMode;
			headers?: Record<string, string>;
			thirdPartyAPI?: boolean;
			responseType?: 'JSON' | 'text' | 'blob';
		};
		type ExecutionResult = {
			success: boolean;
			responseMessage?: string;
			data?: object;
		};
	}
}

export {};
