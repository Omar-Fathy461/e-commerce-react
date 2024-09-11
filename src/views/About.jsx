import React from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import '../assets/sass/about.scss'


const About = () => {

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
        <div className='container'>
            <div className="about " >
                <div className="about-heading text-center" >
                    <h2>About Us</h2>
                    <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} /> About Us </p>
                </div>
                <div className="about-img overflow-hidden ">
                    <img src="https://fashion.minimog.co/cdn/shop/files/img-1-min_d4bb08e2-55db-42c9-b617-98db08ee85e0.jpg?v=1708671907&width=360" loading='lazy' alt="" />
                    <img className='visiable' src="https://fashion.minimog.co/cdn/shop/files/img-5-min.jpg?v=1708672030&width=360" loading='lazy' alt="" />
                </div>
                <div className="about-text fadeIn" ref={addToRefs}>
                    <h5 className='col-lg-8'>Awkwardness gives me great comfort. I’ve never been cool, but I’ve felt cool. I’ve been in the
                        cool place, but I wasn’t really cool – I was trying to pass for hip or cool.</h5>
                    <p>A girl should be two things: classy and fabulous. I am convinced that there can be luxury in simplicity. I wanted to dress the woman who lives and works, not the woman in a painting. It’s hard to balance everything. It’s always challenging. My relationships with producers or photographers – these are relationships that took years. I can’t get sucked into that celebrity thing, because I think it’s just crass. My aim is to make the poor look rich and the rich look poor. Vanity is the healthiest thing in life. I believe that my clothes can give people a better image of themselves – that it can increase their feelings of confidence and happiness. You can hide so much behind theatrics, and I don’t need to do that any more. I don’t really know how to do casual clothes.</p>
                </div>
                <div className='about-info ' >
                    <div className="img col-lg-5 col-sm-12">
                        <img src="https://fashion.minimog.co/cdn/shop/files/img-2-min_a20c8f1f-d109-4d53-beaf-45e5af8ffdfc.jpg?v=1708671941&width=360" alt="" />
                    </div>
                    <div className="info col-lg-6 col-sm-12" >
                        <h2 className='fadeIn' ref={addToRefs} >We are proudly
                            Australian.</h2>
                        <div className='feature fadeIn' ref={addToRefs}>
                            <div><img src="https://cdn.shopify.com/s/files/1/0561/2742/2636/files/icon1.svg?v=1627616411" alt="" /></div>
                            <div>
                                <h6>Soft Fabric</h6>
                                <p>Get complimentary ground shipping on every
                                    order.Don’t love it? Send it back, on us.</p>
                            </div>
                        </div>
                        <div className='feature fadeIn' ref={addToRefs}>
                            <div><img src="https://cdn.shopify.com/s/files/1/0561/2742/2636/files/icon2_daf1b6c2-ef2e-416c-ae6a-a7ddd145b6c5.svg?v=1627616411" alt="" /></div>
                            <div>
                                <h6>Lightweight</h6>
                                <p>Join Minimog Rewards to earn gift cards
                                    and enjoy exclusive member benefits.</p>
                            </div>
                        </div>
                        <div className='feature fadeIn' ref={addToRefs}>
                            <div><img src="https://cdn.shopify.com/s/files/1/0561/2742/2636/files/icon3.svg?v=1627616411" alt="" /></div>
                            <div>
                                <h6>All Day Comfor</h6>
                                <p>We believe getting dressed should be the
                                    easiest part of your day.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-advice fadeIn" ref={addToRefs}>
                    <h2 className='col-lg-10'>The world needs to move fast to make a meaningful
                        difference in the fight against climate change.</h2>
                    <p>A girl should be two things: classy and fabulous. I am convinced that there can be luxury in simplicity. I wanted to dress the woman who lives and works, not the woman in a painting. It’s hard to balance everything. It’s always challenging. My relationships with producers or photographers – these are relationships that took years. I can’t get sucked into that celebrity thing, because I think it’s just crass. My aim is to make the poor look rich and the rich look poor. Vanity is the healthiest thing in life. I believe that my clothes can give people a better image of themselves – that it can increase their feelings of confidence and happiness. You can hide so much behind theatrics, and I don’t need to do that any more. I don’t really know how to do casual clothes.</p>
                </div>
            </div>
        </div>
    )
}

export default About