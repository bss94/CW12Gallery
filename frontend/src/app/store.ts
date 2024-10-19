import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { usersReducer } from "../features/Users/usersSlice.ts";
import { galleriesReducer } from "../features/Gallery/galleriesSlice.ts";

const userPersistConfig = {
  key: "CW12-bss:users",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, usersReducer),
  galleries: galleriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
