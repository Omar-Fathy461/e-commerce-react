import React from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import Buttons from "../common/Buttons"
import "../../assets/sass/Home.scss"

const HeroText = (props) => {

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
        <div className="hero-text" >
            <h5 className="fadeIn" ref={addToRefs}>New Arrivals</h5>
            <h1 className="hero-title fadeIn" ref={addToRefs}>{props.title}</h1>
            <Buttons title="Shop Now" classname="shop-now" style="buttons" path="/products/Men_Shirts" />
        </div>
    )
}

export default HeroText