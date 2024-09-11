import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBagShopping, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import AxiosConfig from "../utils/AxiosConfig";
import Menu from '../components/e-commerce/Menu';
import './Header.scss';

const Header = () => {
    const items = useSelector((state) => state.cart.items);
    const wishlistItemsCount = useSelector((state) => state.wishlist.items.length);
    const totalQuantity = Object.values(items).reduce((acc, currentValue) => acc + currentValue, 0);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [filerUsers, setFilerUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const alertRef = useRef(null);

    const openMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleClickOutside = (event) => {
        if (alertRef.current && !alertRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    const handleClick = () => setIsVisible(!isVisible);

    const handleChange = (e) => setSearchTerm(e.target.value);

    useEffect(() => {
        AxiosConfig.get("/products")
            .then(response => {
                const data = response.data;
                setUsers(data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setFilerUsers([]);
        } else {
            const filter = users.filter(user =>
                user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilerUsers(filter);
        }
    }, [searchTerm, users]);


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        <button onClick={openMenu} className='visibleIcon'>
                            {isMenuOpen ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} className="bars" />}
                        </button>
                        {isMenuOpen && <Menu />}
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
                            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClick} />
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
            {isVisible && (
                <div
                    className="search"
                    ref={alertRef}
                    style={{
                        position: "fixed",
                        top: "7%",
                        left: "50%",
                        width: "100%",
                        height: "120px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: "translate(-50%, -50%)",
                        border: "1px solid black",
                        padding: "20px",
                        backgroundColor: "white",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000
                    }}
                >
                    <div className="container">
                        <div className="box">
                            <div className="log">
                                <img src="https://fashion.minimog.co/cdn/shop/files/logo_a3f90005-86fb-4996-8c21-b46c5011524e.png?v=1709089146&width=500" alt="" />
                            </div>
                            <div className="input-search">
                                <input type="text" onChange={handleChange} placeholder="search products" />
                                <div style={{ position: "absolute", background: "white", border: "1px solid rgba(0, 0, 0, 0.349)" }}>
                                    {filerUsers.length > 0 ? (
                                        filerUsers.map(user => <div key={user.id}>{user.name}</div>)
                                    ) : (
                                        searchTerm !== "" && <div>No results found</div>
                                    )}
                                </div>
                            </div>
                            <div className="search-icon">
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
                </div>
            )}
        </>
    );
};

export default Header;
