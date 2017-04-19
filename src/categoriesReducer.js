import axios from 'axios';
const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';

const loadCategoriesSuccess = (categories)=> ({
  type: LOAD_CATEGORIES_SUCCESS,
  categories
});

const loadCategories = ()=> {
  return (dispatch)=> {
    return axios.get('/api/categories')
      .then(response => dispatch(loadCategoriesSuccess(response.data)));
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
