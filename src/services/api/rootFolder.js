import { api } from './index';

export const rootApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRootFolder: builder.mutation({
            query: (data) => ({
                url: 'sftp_connection/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    useGetRootFolderMutation
} = rootApi;