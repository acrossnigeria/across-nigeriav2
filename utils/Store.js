import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState={
  user:{userDetails:[null]},
};
function reducer(state, action){
  switch (action.type){
    case 'ADD_USER':{
      const newUser=action.payload;
     const userDetails=[...state.user.userDetails, newUser];
     Cookies.set('user',JSON.stringify({...state.user, userDetails}))
     return {...state, user:{...state.user,userDetails}}
    };
    case 'RESET':{
      return{...state, user:{
        userDetails:[]
      }}
    }
    default: return state;
  }
}

export function StoreProvider({children}){
  const [state, dispatch]=useReducer(reducer, initialState);
  const value={state, dispatch};
  return <Store.Provider value={value}>{children}</Store.Provider>
}