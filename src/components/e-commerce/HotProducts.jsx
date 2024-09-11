import React from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import '../../assets/sass/hotProducts.scss'

const HotProducts = () => {

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
            <div className="hot-products ">
                <div className="title-content col-lg-6 col-sm-12">
                    <h6 className='fadeIn' ref={addToRefs}>Hot This Week</h6>
                    <h2 className='fadeIn' ref={addToRefs}>Beautifully functional consciously crafted</h2>
                    <div className="accordions ">
                        <div className="accordion-one fadeIn" ref={addToRefs}>
                            <h3> 01. Performance Blazer</h3>
                            <p>This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder</p>
                        </div>
                        <div className="accordion-two fadeIn" ref={addToRefs}>
                            <h3>02. The Bomber Jackets</h3>
                            <p>This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder</p>
                        </div>
                        <div className="accordion-three fadeIn" >
                            <h3> 03. Corduroy Shirts</h3>
                            <p>This snuggly soft Cloud Relaxed Cardigan serves a relaxed fit, with saddle shoulders—where the armhole seams curve towards the neckline so that the sleeve seamlessly hugs your shoulder</p>
                            <p></p>
                        </div>

                    </div>
                </div>
                <div className="content-img col-6 " >
                    <img src="https://fashion.minimog.co/cdn/shop/files/tab-1-min_bf03a574-ef1a-47d0-8d99-6f69ff04e06f.jpg?v=1708658215&width=360" alt="" />
                </div>
            </div>
        </div>
    )
}

export default HotProducts