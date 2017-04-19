import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';

const ProductsPage = ({ products })=> (
  <div className='container'>
    <ul className='list-group'>
    {
      products.map( product => {
        return (
          <li className='list-group-item' key={product.id}>{ product.name }</li>
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

