import React from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { Link, useNavigate } from 'react-router-dom'
import '../../assets/sass/coastalEdition.scss'
const CoastalEdition = () => {

    const navigate = useNavigate();
    const handleProductClick = (id) => {
        navigate(`/categories/products/:categoryName/products/${id}`);
    };
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
        <div className="container">
            <div className="coastalEdition-heading text-center">
                <h2 className='fadeIn' ref={addToRefs}>The Coastal Edition</h2>
                <p className='fadeIn' ref={addToRefs}>Our new cozy collection is made with environmentally friendly materials
                    and simple to care for so you can stay cozy wherever .</p>
                <Link ref={addToRefs} to="/categories" className="button">Shop Now</Link>
            </div>
            <div className="coastalEdition fadeIn" ref={addToRefs}>
                <div className="shirt col-lg-6 col-md-6 col-sm-12">
                    <span className='white-circle'>

                        <div className='shirt-card'>
                            <img src="https://fashion.minimog.co/cdn/shop/products/47871774.webp?v=1708333036&width=360" alt="" />
                            <h6 className='product-title'>The Oxford Shirt</h6>
                            <p>$88.00</p>
                        </div>
                    </span>
                </div>
                <div className="pant col-lg-6 col-md-6  col-sm-12">

                    <span className='white-circle2'>
                        <div className="t-shirt-card">
                            <img src="https://fashion.minimog.co/cdn/shop/products/1.webp?v=1708332545&width=360" alt="" />
                            <h6 className='product-title'>The White Pocket Tee</h6>
                            <p>$52.00</p>
                        </div>
                    </span>
                    <span className='white-circle3'>
                        <div className="pant-card">
                            <img src="https://fashion.minimog.co/cdn/shop/products/47871838.webp?v=1708333417&width=360" alt="" />
                            <h6 className='product-title'>The Stretch Organic Jean</h6>
                            <p>$100.00</p>
                        </div>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default CoastalEdition