import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBagShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import AxiosConfig from "../utils/AxiosConfig";
import Menu from '../components/e-commerce/Menu';
import './Header.scss';

const Header = () => {
    const items = useSelector((state) => state.cart.items);
    const wishlistItemsCount = useSelector((state) => state.wishlist.items.length);
    const totalQuantity = Object.values(items).reduce((acc, currentValue) => acc + currentValue, 0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="header">
                <div className="navOne text-center">
                    <p>Free Delivery on orders over $200</p>
                </div>
            </div>
            <div className="navThree">
                <div className="content container" style={{ position: "relative" }}>
                    <div className="header-links">
                        <button className='visibleIcon' onClick={() => setIsMenuOpen(state => !state)}>
                            <FontAwesomeIcon icon={faBars} className="bars" />
                        </button>
                        <NavLink to="/" className='home'>Home</NavLink>
                        <NavLink to="/about" className='about'>About</NavLink>
                        <NavLink to="/contact" className='contact'>Contact</NavLink>
                        <NavLink to="/sign" className='signUp'>Sign Up</NavLink>
                        <NavLink to="/categories" className='products'>Products</NavLink>
                    </div>
                    <div className="logo">
                        <img src="https://fashion.minimog.co/cdn/shop/files/logo_a3f90005-86fb-4996-8c21-b46c5011524e.png?v=1709089146&width=500" alt="" />
                    </div>
                    <div className="icons d-flex">
                        <div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        <Link to="/wishlist" className="heart-icon">
                            <FontAwesomeIcon icon={faHeart} />
                            <div className="totalWishlist">{wishlistItemsCount}</div>
                        </Link>
                        <Link to="/cart" className="cart-icon">
                            <FontAwesomeIcon icon={faBagShopping} />
                            <div className="numItem">{totalQuantity}</div>
                        </Link>
                    </div>
                </div>
            </div>
            {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
        </>
    );
};

export default Header;
