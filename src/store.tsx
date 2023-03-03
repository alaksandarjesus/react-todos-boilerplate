import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./reducers/TodosReducer"

  const store = configureStore({
    reducer:{
        todo: todoReducer
    }
});

export default store;