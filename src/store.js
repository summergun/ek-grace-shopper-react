import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';


const combined = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  auth: authReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
