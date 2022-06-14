import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import sampleReducer from './src/redux/samplesSlice';

const combinedReducer = combineReducers({
   samples: sampleReducer,
});

const rootReducer = (state, action) => {
   if (action.type === 'samples/logout') {
     state = undefined;
   }
   return combinedReducer(state, action);
 };

const persistConfig = {
   key: 'root',
   version: 1,
   storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
   }),
});

export const persistor = persistStore(store);
export default store;