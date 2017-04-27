import axios from 'axios';
const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';

const loadCategoriesSuccess = (categories)=> ({
  type: LOAD_CATEGORIES_SUCCESS,
  categories
});

const loadCategories = ()=> {
  return (dispatch)=> {
    let categories;
    return axios.get('/api/categories')
      .then( response => response.data) 
      .then( _categories => categories = _categories)
      .then(() => dispatch(loadCategoriesSuccess(categories)))
      .then(() => categories);
  };
};

export {
  loadCategories
};


const categoriesReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_CATEGORIES_SUCCESS:
      state = action.categories;
      break;
  }
  return state;
};

export default categoriesReducer;
