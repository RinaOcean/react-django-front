import { api } from './index';

export const rootApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRootFolder: builder.query({
            query: (data) => {
                return {                    
                    url: "sftp_connection/",
                    method: "POST",
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