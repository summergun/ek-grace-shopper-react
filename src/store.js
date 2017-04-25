import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import authReducer from './authReducer';
import lineItemsReducer from './lineItemsReducer';
import cartReducer from './cartReducer';


const combined = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  auth: authReducer,
  lineItems: lineItemsReducer,
  cart: cartReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
