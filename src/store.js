import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts} from './productsReducer';
import categoriesReducer, { loadCategories } from './categoriesReducer';


const combined = combineReducers({
  products: productsReducer,
  categories: categoriesReducer
});

const store = createStore(combined, applyMiddleware(thunk));


store.dispatch(loadProducts());
store.dispatch(loadCategories());

export default store;
