import { useEffect } from "react"
import { Link } from "react-router-dom";
import Loading from "../../views/Loading";
import '../../assets/sass/products.scss'
import Buttons from "../common/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/slices/categories/categoriesSlice";


const Products = () => {
    const dispatch = useDispatch()
    const { loading, items } = useSelector((state) => state.categories)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])



    return (
        <>
            <div className="container">
                <div className="products-heading">
                    <h2>All collection</h2>
                    <p>Here is your chance to upgrade your wardrobe with a variation of styles and fits that are both feminine and relaxed.</p>
                </div>
                <div className="collections">
                    <div className=" row">
                        {loading ? (<Loading />) : items.map((el) => {
                            return <Link key={el.name} to={`products/${el.name}`} state={{ title: el.title }} className="col-lg-3 col-md-6 col-sm-12 product-card">
                                <div className="collection " style={{ backgroundImage: `url(${el.image})`, height: "400px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                                    <Buttons title={el.title} style="product-btn" path={el.id} />
                                </div>
                            </Link>
                        })}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Products