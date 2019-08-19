import { createStore } from 'redux';

const initialState = {
  user: {
   _id: '',
   name: '',
   email: '',
   username: '',
   createdAt: '',
   updatedAt: ''
  }  
};

const reducerUsuario = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state, 
                user: {
                    _id: action.user._id,
                    name: action.user.name,
                    email: action.user.email,
                    username: action.user.username,
                    createdAt: action.user.createdAt,
                    updatedAt: action.user.updatedAt
                }
            };
        case 'CHANGE_USERNAME':
            return {
                ...state,
                user: {
                    username: action.username
                }
            }
        default:
            return state
    }
};

const makeStore = (initialState, options) => {
    return createStore(reducerUsuario, initialState);
};

export default makeStore;