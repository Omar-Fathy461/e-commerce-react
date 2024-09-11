import React from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { Link } from "react-router-dom";
import Buttons from "../common/Buttons";
import "../../assets/sass/saleCollections.scss";

const SaleCollections = () => {
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
                        fadeIn([entry.target]); // تطبيق التأثير عند دخول العنصر في العرض
                    } else {
                        fadeOut([entry.target]); // تطبيق التأثير عند خروج العنصر من العرض
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
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

    const fadeIn = (elements) => {
        gsap.fromTo(elements,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                ease: "power4.out",
                duration: 2,
                stagger: 0.3 // التأخير بين ظهور كل كارت والتاني
            }
        );
    };

    const fadeOut = (elements) => {
        gsap.to(elements, {
            opacity: 0,
            y: -20,
            ease: "power4.out",
            duration: 2
        });
    };

    return (
        <div className="container">
            <div className="saleCollections">
                <h2>Season Sale Collections</h2>
                <div className="saleCollections-cards">
                    <div className="col-lg-4 col-sm-12 fadeIn" ref={addToRefs}>
                        <span>
                            <img src="https://fashion.minimog.co/cdn/shop/files/collection-1-min_27fdc64e-48e8-4b76-939d-62b695ac9b1d.jpg?v=1708659896&width=533" alt="" />
                        </span>
                        <h5>60% Off on Selected Jeans</h5>
                        <p>Add a free personalized note during checkout.</p>
                        <Link to="categories/products/men_pants">
                            <Buttons title="Shop Jeans" style="button" />
                        </Link>
                    </div>
                    <div className="col-lg-4 col-sm-12 fadeIn" ref={addToRefs}>
                        <span>
                            <img src="https://fashion.minimog.co/cdn/shop/files/collection-2-min_61073ae4-a066-4469-84f2-38c1bb679bfb.jpg?v=1708659950&width=533" alt="" />
                        </span>
                        <h5>Up to 30% Off on Shirts</h5>
                        <p>Brittany Bathgate shows how less is more.</p>
                        <Link to="categories/products/men_shirts">
                            <Buttons title="Shop Shirts" style="button" />
                        </Link>
                    </div>
                    <div className="col-lg-4 col-sm-12 fadeIn" ref={addToRefs}>
                        <span>
                            <img src="https://fashion.minimog.co/cdn/shop/files/collection-3-min_78c47e9e-5b3f-4c8b-8236-1374323c11ec.jpg?v=1708660580&width=533" alt="" />
                        </span>
                        <h5>Up to 20% Off on Coats</h5>
                        <p>Brittany Bathgate shows how less is more.</p>
                        <Link to="categories/products/outwear">
                            <Buttons title="Shop Outwear" style="button" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleCollections;
