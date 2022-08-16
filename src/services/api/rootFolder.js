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
                    providesTags: ["Browse"],
                };
            },
            // transformResponse: (response) => response.data,
        }),

        getItemDetails: builder.mutation({
            query: (data) => {
                return {
                    url: "browse_sftp",
                    method: "POST",
                    body: data,
                };
            },
            // invalidatesTags: ["Browse"],
            // transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useGetRootFolderQuery, useGetItemDetailsMutation
} = rootApi;