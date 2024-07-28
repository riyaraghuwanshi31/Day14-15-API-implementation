import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import productapi from '../api/productsapi.json';
import { CartContext } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedProductId, setAddedProductId] = useState(null);

  const categories = productapi.categories;

  const filterProducts = (categoryName) => {
    setFilteredCategory(categoryName);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 3000); // Clear the message after 3 seconds
  };

  const filteredCategories = categories.filter(category =>
    filteredCategory === 'all' || category.category_name === filteredCategory
  ).map(category => ({
    ...category,
    category_products: category.category_products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="mainCont">
      <nav>
        <li id="logo">ShopOnline</li>
        <ul>
          <li><a href="#all" onClick={() => filterProducts('all')}>All</a></li>
          <li><a href="#Men" onClick={() => filterProducts('Men')}>Men</a></li>
          <li><a href="#Women" onClick={() => filterProducts('Women')}>Women</a></li>
          <li><a href="#Kids" onClick={() => filterProducts('Kids')}>Kids</a></li>
        </ul>

        <div className="search">
          <input
            type="text"
            id="searchInput"
            placeholder="Search by product, title, or vendor name.."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div id='gocart'>
        <Link to="/cart" className="cart-link">Go to Cart</Link>
        </div>
        
      </nav>

      {filteredCategories.map(category => (
        <div key={category.category_name}>
          <div className="products">
            {category.category_products.map(product => (
              <div key={product.id} className="product">
                <img id="ig" src={product.image} alt={product.title} />
                <h3 id="vend">{product.vendor}</h3>
                <p id="title">{product.title}</p>
                <p id="price">Rs.{product.price} <span className="mrp">Rs.{product.compare_at_price}</span></p>
                {product.badge_text && <p id="badge"> {product.badge_text}</p>}
                <button id="btn" onClick={() => handleAddToCart(product)}>Add to cart</button>
                {addedProductId === product.id && <div id="add">Added!</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
