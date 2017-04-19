import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const CategoriesPage = ({ categories })=> (
  <div className='container'>
    <ul className='list-group'>
      {
        categories.map( category=> {
          return (
          <li key={category.id} className='list-group-item'>
              <Link to={`/categories/${category.name}`}>
                { category.name }
              </Link>
          </li>
          );
          }
        )
      }
    </ul>
  </div>
);

const mapStateToProps = ({ categories })=> (
  {
    categories
  }
);
export default connect(mapStateToProps)(CategoriesPage);

