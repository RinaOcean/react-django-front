import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "../services/api";
import { rootApi } from "../services/api/rootFolder";
import { rootFolderSlice } from "./features/rootFolder/rootFolder";

export const store = configureStore({
    reducer: {
        rootFolder: rootFolderSlice,
        [rootApi.reducerPath]: rootApi.reducer,        
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([api.middleware, rootApi.middleware]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);