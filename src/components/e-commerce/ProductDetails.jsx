import React from 'react'
import gsap from 'gsap'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/shoppingCart/cartSlice";
import { wishlistAction } from "../../store/slices/WishList/wishlistSlice";
import { useParams, Link } from "react-router-dom"
import AxiosConfig from "../../utils/AxiosConfig";
import Loading from "../../views/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Buttons from "../common/Buttons";
import logoBrand from '../../assets/images/6220a9c7912013c51947f9b9.png'
import Carousel from "../common/Carousel"
import { faCodeCompare, faQuestion, faRuler, faTruck, faBox } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import '../../assets/sass/productDetails.scss'



const ProductDetails = () => {
    const [details, setDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(1);


    const increase = () => setCount(count + 1);
    const decrease = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };



    let { id } = useParams()

    useEffect(() => {

        const getProductDetails = async () => {
            setIsLoading(true)
            try {
                const response = await AxiosConfig(`/products?id=eq.${id}`)
                setDetails(response.data[0])
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        }
        getProductDetails()

    }, [id])





    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(addToCart(id))
    }

    const addTOWishlist = () => {
        dispatch(wishlistAction(id))
    }

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
        <>
            <div className="container">
                <p className="text-center productDetails-heading"><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} /> {details?.title} </p>
                <div className="productDetails">
                    <div className="item-img col-lg-7 col-sm-12">
                        {isLoading ? (<Loading />) :
                            (<div className="main">
                                <div ><img src={details?.image[0]} alt="" /></div>
                                <div ><img src={details?.image[1]} alt="" /></div>
                                <div ><img src={details?.image[2]} alt="" /></div>
                                <div ><img src={details?.image[3]} alt="" /></div>
                            </div>)}

                    </div>
                    <div className="itme-info col-lg-5 col-sm-12">
                        <div className=" product-title d-flex justify-content-between">
                            <h2>{details?.title}</h2>
                            <button className="heart-icon" onClick={addTOWishlist}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                        <h4>${details?.price}.00</h4>
                        <h6>Color:{details?.color}</h6>
                        <div style={{ width: "90px", height: "90px", cursor: "pointer" }}>
                            <img src={details?.image[0]} alt="" style={{ width: "100%" }} loading="lazy" />
                        </div>
                        <div className="quantity">
                            <h6>Quantity</h6>
                            <div className="quantity-box">
                                <div className="counter">
                                    <button className="decrease" onClick={decrease}>-</button>{count}<button className="increase" onClick={increase}>+</button>
                                </div>
                                <div className="addToCart" onClick={addToCartHandler}>
                                    <Buttons title="Add to cart" style="button " />
                                </div>
                            </div>
                        </div>
                        <div className="shop-pay">
                            <Link className="shopPay-link">Buy with <img src={logoBrand} alt="" /></Link>
                            <div className="moreOptions"><Link>More Payment Options</Link></div>
                        </div>
                        <div className="options">
                            <div><FontAwesomeIcon icon={faCodeCompare} />Compare</div>
                            <div><FontAwesomeIcon icon={faQuestion} />Ask a question</div>
                            <div><FontAwesomeIcon icon={faRuler} />Size guide</div>

                        </div>
                        <div className=" shipping-returns">
                            <p><FontAwesomeIcon icon={faTruck} /> <span>Estimated Delivery</span> :Aug 04 - Aug 08 </p>
                            <p><FontAwesomeIcon icon={faBox} /> <span>Free Shipping & Returns</span>: On all orders over $75</p>
                        </div>
                        <div className="pay-types">
                            <div><img src="https://fashion.minimog.co/cdn/shop/files/trust_965c85b7-ca37-4190-bea4-b7f926fd38d7.png?v=1709199170&width=360" alt="" /></div>
                            <p>Guarantee safe & secure checkout</p>
                        </div>
                    </div>
                </div>
                <div className="Product-description fadeIn" ref={addToRefs}>
                    <h5>Product description</h5>
                    <p>{details?.description}</p>
                </div>
            </div>
            <div className="ourProducts">
                <div className="ourProducts-title col-lg-6 col-sm-12 fadeIn" ref={addToRefs}>
                    <div className="container">

                        <h6>Our Products</h6>
                        <h2>We are proudly Australian</h2>
                        <p>This piece features a cord collar, button-front closure, and two front pockets
                            in durable organic cotton canvas.</p>
                        <p>Did You Know? Organic cotton uses crop rotation, cover crops, and organic
                            fertilizers instead of toxic chemical fertilizers or pesticides—which means
                            cleaner water, lower water usage, lower pesticide use, healthier soil, and a
                            safer working environment for cotton farmers, compared to conventional.</p>
                    </div>
                </div>
                <div className="ourProducts-img col-lg-6 col-sm-12 fadeIn" ref={addToRefs}>
                    <img src="https://fashion.minimog.co/cdn/shop/files/banner-1-min_d5719162-5a14-4b7a-856e-3fdc6a7c7a19.jpg?v=1708656751&width=1600" alt="" />
                </div>
            </div>
            <div className="ourProducts">
                <div className="ourProducts-img col-lg-6 col-sm-12 fadeIn" ref={addToRefs}>
                    <img src="https://fashion.minimog.co/cdn/shop/files/banner-2-min_955f5e5a-5bc9-4863-949d-5fc3d008ce13.jpg?v=1708656762&width=1600" alt="" />
                </div>
                <div className="ourProducts-title col-lg-6 col-sm-12 fadeIn" ref={addToRefs}>
                    <div className="container">

                        <h6 className='fadeIn' ref={addToRefs}>We are Good Performers</h6>
                        <h2 className='fadeIn' ref={addToRefs}>Organic cotton uses crop rotation, cover crops</h2>
                        <p className='fadeIn' ref={addToRefs}>This piece features a cord collar, button-front closure, and two front pockets
                            in durable organic cotton canvas.</p>
                        <p className='fadeIn' ref={addToRefs}>Did You Know? Organic cotton uses crop rotation, cover crops, and organic
                            fertilizers instead of toxic chemical fertilizers or pesticides—which means
                            cleaner water, lower water usage, lower pesticide use, healthier soil, and a
                            safer working environment for cotton farmers, compared to conventional.</p>
                    </div>
                </div>
            </div>
            <div className="featured">
                <div className='fadeIn' ref={addToRefs}>
                    <h6>Featured by Press</h6>
                    <h2>&quot; Super class, cute, comfortable. You can wear them with just about anything.&quot;</h2>
                </div>
                <div className="brand fadeIn" ref={addToRefs}>
                    <img src="https://fashion.minimog.co/cdn/shop/files/press-icon-3.png?v=1709692696&width=165" alt="" className="brandOne" />
                    <img src="https://fashion.minimog.co/cdn/shop/files/press-icon-1.png?v=1709692696&width=165" alt="" className="brandTwo" />
                    <img src="https://fashion.minimog.co/cdn/shop/files/press-icon-2.png?v=1709692695&width=165" alt="" className="brandThree" />
                </div>
            </div>
            <div className="container">
                <Carousel title="Recently Viewed Products" />
            </div>
        </>
    )
}

export default ProductDetails