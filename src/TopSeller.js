import React from 'react';
import { connect } from 'react-redux';
import { createLineItem } from './reducers/cartReducer';

const TopSeller = ({ favoriteProduct, user, count, createLineItem, cart })=> {
  if(!favoriteProduct)
    return null;
  return (
    <div className='well'>
    {
      user ? (
       <button className='btn btn-primary' onClick={ ()=> createLineItem(user, favoriteProduct, cart)}>Top Seller: { favoriteProduct.name } - { count } Bought - Click to Buy!!</button> 
      ):(
        <span>{ favoriteProduct.name } { count }</span>
      )
    }
    </div>
  );
}

const mapStateToProps = ({ lineItems, categories, auth, cart })=> {
  const map = lineItems.reduce((memo, lineItem) => {
    memo[lineItem.productId] = typeof memo[lineItem.productId] === 'undefined' ? 0 : memo[lineItem.productId]; 
    memo[lineItem.productId]++;
    return memo;
  }, {});
  const max = Object.keys(map).reduce((memo, key)=> {
    if(map[key] > memo.max){
      memo.max = map[key];
      memo.id = key * 1;
    }
    return memo;
  }, { max: 0 });
  const favoriteProduct = categories.reduce((memo, category)=> {
    var found = category.products.reduce((found, product)=> {
      if(product.id === max.id)
        found = product;
      return found;
    }, undefined);
    if(found)
      memo = found;
    return memo;
  }, undefined); 

  return {
    favoriteProduct: favoriteProduct,
    user: auth.user,
    count: max.max,
    cart
  };

};

const mapDispatchToProps = (dispatch)=> {
  return {
    createLineItem: (user, product, cart)=> dispatch(createLineItem( user, product, cart ))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopSeller);
