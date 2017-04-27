import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/productsReducer';
import ordersReducer from './reducers/ordersReducer';
import categoriesReducer from './reducers/categoriesReducer';
import authReducer from './reducers/authReducer';
import lineItemsReducer from './reducers/lineItemsReducer';
import cartReducer from './reducers/cartReducer';
import usersReducer from './reducers/usersReducer';


const combined = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  auth: authReducer,
  lineItems: lineItemsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  users: usersReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
