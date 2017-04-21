import axios from 'axios';
const LOAD_LINE_ITEMS_SUCCESS = 'LOAD_LINE_ITEMS_SUCCESS';

const loadLineItemsSuccess = (lineItems)=> ({
  type: LOAD_LINE_ITEMS_SUCCESS,
  lineItems
});

const loadLineItems = ()=> {
  return (dispatch)=> {
    return axios.get('/api/lineItems')
      .then(response => dispatch(loadLineItemsSuccess(response.data)));
  };
};

export {
  loadLineItems
};


const lineItemsReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_LINE_ITEMS_SUCCESS:
      state = action.lineItems;
      break;
    case 'CREATE_LINE_ITEM_SUCCESS':
      state = [...state, action.lineItem ];
      break;
  }

  return state;
};

export default lineItemsReducer;
