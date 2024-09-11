import React from 'react'
import gsap from 'gsap'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductByItems } from '../../store/slices/shoppingCart/cartSlice';
import { removeItem } from '../../store/slices/shoppingCart/cartSlice';
import Loading from '../../views/Loading';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logoBrand from '../../assets/images/6220a9c7912013c51947f9b9.png'
import '../../assets/sass/shoppingCartProducts.scss'

const ShoppingCartProducts = () => {

    const dispatch = useDispatch();
    const { items, productFullInfo, loading } = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(getProductByItems(items))
    }, [dispatch, items])

    const [quantity, setQuantity] = useState(1);

    const handleIncrease = (id) => {
        setQuantity(el => ({
            ...el,
            [id]: (el[id] || 1) + 1
        }));
    };

    const handleDecrease = (id) => {
        setQuantity(el => ({
            ...el,
            [id]: (el[id] > 1 ? el[id] - 1 : 1)
        }));
    };

    const removeItems = (id) => {
        dispatch(removeItem(id));
    };

    const subtotal = productFullInfo.reduce((acc, product) => {
        const quantities = quantity[product.id] || items[product.id] || 1;
        return acc + (product.price * quantities);
    }, 0);



    const sectionRef = React.useRef(null);
    sectionRef.current = [];

    const addToRefs = (el) => {
        if (el && !sectionRef.current.includes(el)) {
            sectionRef.current.push(el);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        fadeIn(entry.target);
                    } else {
                        fadeOut(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: .5,
            }
        );
        sectionRef.current.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sectionRef.current.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    const fadeIn = element => {
        gsap.to(element, 2, {
            opacity: 1,
            y: 0,
            ease: "power4.out",
            stagger: {
                amount: 0.3
            }
        });
    };

    const fadeOut = element => {
        gsap.to(element, 2, {
            opacity: 0,
            y: -20,
            ease: "power4.out"
        });
    };

    return (
        <div className='container mt-5'>
            <div className="cart-content">
                {loading ? (
                    <Loading />
                ) : (productFullInfo.length > 0 ? (
                    productFullInfo.map((el) => {
                        const quantities = quantity[el.id] || items[el.id] || 1;
                        return (
                            <div key={el.id} className="cart-detail fadeIn" ref={addToRefs}>
                                <div className="heading fadeIn" ref={addToRefs}>
                                    <h6>Product</h6>
                                    <div className='img-item'>
                                        <div className="img">
                                            <Link ><img src={el.image} alt={el.title} /></Link>
                                        </div>
                                        <div className="item-info">
                                            <h6>{el.title}</h6>
                                            <Button className="col-4 forgetPassword" type="button" onClick={() => removeItems(el.id)}>
                                                remove
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="quantity-item sub-quantity text-center">
                                        <div className="counter">
                                            <button className="decrease" onClick={() => handleDecrease(el.id)}>-</button>
                                            {quantities}
                                            <button className="increase" onClick={() => handleIncrease(el.id)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="heading price-heading">
                                    <h6>Price</h6>
                                    <div className="price-item">${el.price}</div>
                                </div>
                                <div className="heading">
                                    <h6 className='quantity'>Quantity</h6>
                                    <div className="quantity-item main-quantity text-center">
                                        <div className="counter">
                                            <button className="decrease" onClick={() => handleDecrease(el.id)}>-</button>
                                            {quantities}
                                            <button className="increase" onClick={() => handleIncrease(el.id)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="heading">
                                    <h6 className='total'>Total</h6>
                                    <div className="total-price">
                                        ${(el.price * quantities).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        );
                    })) : (
                    <h3 className="noProducts">No items in Shopping Cart</h3>
                )
                )}
                {productFullInfo.length > 0 ? (
                    <div className="subtotal col-lg-5">
                        <div className="Subtotal-head">
                            <div>
                                <h6>Subtotal</h6>
                                <p>Taxes and shipping calculated at checkout</p>
                            </div>
                            <h5>{subtotal.toFixed(2)}</h5>
                        </div>
                        <button className="checkOut" >CHECK OUT</button>
                        <div className="shop-pay">
                            <Link className="shopPay-link">Buy with <img src={logoBrand} alt="" /></Link>
                            <div className="moreOptions"><Link>More Payment Options</Link></div>
                        </div>
                    </div>

                ) : ""}
            </div>
        </div>
    );
};

export default ShoppingCartProducts;