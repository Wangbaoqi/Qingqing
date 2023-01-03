import { createStore, applyMiddleware, compose } from 'redux'

import { configureStore } from '@reduxjs/toolkit';

import thunkMiddleware from 'redux-thunk'
import reducer from '@/reducers/index'

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose
const middleWares = [thunkMiddleware]

if (process.env.NODE_ENV === 'development') {
  middleWares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleWares)
  // other store enhancers if any
)

// export default function configStore() {
//   const store = createStore(rootReducer, enhancer)
//   return store
// }

export const store = configureStore({
  reducer
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

