import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosConfig from "../../utils/AxiosConfig";
import { motion } from "framer-motion";
import Loading from "../../views/Loading";
import '../../assets/sass/carousel.scss';

const CarouselItems = (prop) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [width, setWidth] = useState(0);
    const carouselRef = useRef();
    const navigate = useNavigate();

    const handleProductClick = (id) => {
        navigate(`/categories/products/:categoryName/products/${id}`);
    };

    const showProducts = products.filter((el) => {
        return [
            "The Toasted Overshirt", "The Toasted Polo",
            "The Sleeve Cocoa Shirt", "The Oatmeal Pullover",
            "The Transit Backpack", "The Bench Pant",
            "The Tread-White Sneaker",
            "Polarised Sunglasses",
            "The Essential Black Crew",
            "The Black Messenger",
            "The State Hoodie"
        ].includes(el.title);
    });

    useEffect(() => {
        const getAllProducts = async () => {
            setIsLoading(true);
            try {
                const { data } = await AxiosConfig.get("products");
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        getAllProducts();
    }, []);

    useEffect(() => {
        if (carouselRef.current) {
            const itemWidth = 300; // عرض كل صورة
            const gap = 24; // حجم الـ gap بالبيكسل
            const totalWidth = showProducts.length * itemWidth + (showProducts.length - 1) * gap;
            const containerWidth = carouselRef.current.offsetWidth;
            setWidth(totalWidth - containerWidth);
        }
    }, [showProducts]);

    // Variants for fade-in and fade-out animations
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="container">
            <motion.div ref={carouselRef} className="carousel">
                <h2 className="items-heading">{prop.title}</h2>
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="inner-carousel"
                >
                    {isLoading ? (
                        <Loading />
                    ) : (
                        showProducts.map((el) => (
                            <motion.div
                                key={el.id}
                                className="item-container"
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <Link to={`/product/${el.id}`}>
                                    <motion.div className="item">
                                        <img src={el.image} alt="" loading="lazy" />
                                    </motion.div>
                                </Link>
                                <h6>{el.title}</h6>
                                <p>${el.price}.00</p>
                                <button className="show-product" onClick={() => handleProductClick(el.id)}>show</button>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default CarouselItems;
