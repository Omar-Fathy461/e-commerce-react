import React from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import '../../assets/sass/onSale.scss'
const OnSale = () => {

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
                threshold: 1,
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
            <div className="onSale">
                <div className="onSale-title col-lg-6 col-sm-12 fadeIn" ref={addToRefs}>
                    <h6 className=' fadeIn' >On Sale</h6>
                    <h2 className=' fadeIn' >Get Moving with 60% Off
                        on Heavyweight Shirt</h2>
                    <p className=' fadeIn' >The perfect blend of comfort and durability is now at your
                        fingertips, all at a price that s hard to resist.</p>
                    <Link to="products/categories/men_shirts" className="button fadeIn" >Shop Collection</Link>
                </div>
                <div className="onSale-img col-lg-6 col-sm-12 fadeIn" ref={addToRefs}>
                    <div><img src="https://fashion.minimog.co/cdn/shop/files/img-1-min_49775b46-4e0e-4f05-bd3e-f3f163db16d4.jpg?v=1709698741&width=533" alt="" /></div>
                    <div><img src="https://fashion.minimog.co/cdn/shop/files/img-2-min_191237af-c9f0-43fb-9949-4b12fbd3e6c2.jpg?v=1709698745&width=533" alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default OnSale