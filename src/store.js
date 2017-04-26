import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import ordersReducer from './reducers/ordersReducer';
import categoriesReducer from './reducers/categoriesReducer';
import authReducer from './reducers/authReducer';
import lineItemsReducer from './reducers/lineItemsReducer';
import cartReducer from './reducers/cartReducer';


const combined = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  auth: authReducer,
  lineItems: lineItemsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
