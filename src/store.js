import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';


const combined = combineReducers({
  products: productsReducer,
  categories: categoriesReducer
});

const store = createStore(combined, applyMiddleware(thunk));

export default store;
