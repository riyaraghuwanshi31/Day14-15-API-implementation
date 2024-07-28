import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className='cartCont'>
            <div className='cartNav'>
                <h1>Your Cart</h1>
              
                <Link to="/" className="contShop">Continue shopping</Link>
                
               
            </div>

            {cart.length > 0 ? (
                cart.map(product => (
                    <div className="cart-products">
                        <div key={product.id} className="cart-item">
                            <img src={product.image} alt={product.title} />
                            <div className='cartDet'>
                                <h3>{product.title}</h3>
                                <p>Vendor: {product.vendor}</p>
                                <p>Price: Rs.{product.price}</p>
                            </div>
                            <div className="buy">
                                <button id='buyBtn'>Buy Now</button>
                            </div>
                        </div>
                    </div>

                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
