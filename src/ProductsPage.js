import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { createLineItem } from './reducers/authReducer';

import ProductItem from './ProductItem';


const ProductsPage = ({ products })=> (
  <div className='container'>
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <ProductItem product={ product } key={ product.id} />
        );
      }) 
    }
    </ul>
  </div>
);

const mapStateToProps = ({ categories }, ownProps)=> {
  const filtered = categories.filter((category)=> category.name === ownProps.params.name ); 
  return {
    products: filtered.length ? filtered[0].products : [] 
  }
}

export default connect(mapStateToProps)(ProductsPage);

