import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { ganApiSlice } from './slices/cgan';
import { openIfsApiSlice } from './slices/open-ifs';
import { settingsApiSlice } from './slices/settings';

export const store = configureStore({
    reducer: {
        [settingsApiSlice.reducerPath]: settingsApiSlice.reducer,
        [ganApiSlice.reducerPath]: ganApiSlice.reducer,
        [openIfsApiSlice.reducerPath]: openIfsApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(settingsApiSlice.middleware)
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
