import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/slices/products/productsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import '../assets/sass/wishlist.scss'

const Wishlist = () => {
    const { items, loading } = useSelector((state) => state.wishlist);
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProductClick = (id) => {
        navigate(`/categories/products/:categoryName/products/${id}`);
    };

    useEffect(() => {
        dispatch(getProducts({ categoryName }));
    }, [categoryName, dispatch]);


    return (
        <div className="container">
            <div className="wishlist">
                <div className="wihslist-head text-center">
                    <h2>Wishlist</h2>
                    <p><Link to="/">Home</Link> <FontAwesomeIcon icon={faAngleRight} /> Wishlist </p>
                </div>
                <div className="myWishlist ">
                    {loading ?
                        (<Loading />) :
                        (items.length > 0 ? (
                            items.map((el) => (
                                <div key={el.id} className="wishlist-item " onClick={() => handleProductClick(el.id)}>
                                    <div className=" wislist-card ">
                                        <img src={el.image} alt={el.title} loading="lazy" />
                                        <h6>{el.title}</h6>
                                        <p>${el.price}.00</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3 className="noItems">No items in wishlist</h3>
                        ))
                    }
                </ div>
            </div>
        </div>
    );
};

export default Wishlist;
