import { api } from './index';

export const rootApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRootFolder: builder.query({
            query: (data) => {
                return {
                    // mode: "no-cors",
                    url: "sftp_connection/",
                    method: "POST",
                    // credentials: "include",
                    // headers: {
                    //     Accept: "application/json",
                    //     "Content-Type": "application/json",
                    // },
                    body: data,
                };
            },
            // transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useGetRootFolderQuery
} = rootApi;