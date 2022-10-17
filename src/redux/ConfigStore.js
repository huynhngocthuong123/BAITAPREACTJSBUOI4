import { applyMiddleware, combineReducers, createStore } from "redux"
import { DatVeReducer } from "./datVeReducer";


const rootReducers = combineReducers({
    // chưa các redux
    DatVeReducer,
});
export const store = createStore(rootReducers, applyMiddleware())