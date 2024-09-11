import { Link } from "react-router-dom"
import HeroText from "../components/e-commerce/HeroText";
import CarouselItems from "../components/common/Carousel";
import HotProducts from "../components/e-commerce/HotProducts";
import SaleCollections from "../components/e-commerce/SaleCollections";
import NewCollection from "../components/e-commerce/NewCollection";
import OnSale from "../components/e-commerce/OnSale";
import LogoSlid from "../components/e-commerce/LogoSlid";
import CoastalEdition from "../components/e-commerce/CoastalEdition";
import "../assets/sass/Home.scss"
const Home = () => {


    return (
        <>
            <div className="main">
                <div className="row">
                    <Link className="col-lg-6 col-sm-12" to="categories/products/t-shirts">
                        <div className="shirt " ><HeroText title="Filled Shirt Jacket" /></div>
                    </Link>
                    <Link className="col-lg-6 col-sm-12" to="categories/products/men_pants">
                        <div className="hoodie"><HeroText title="Merino Hoodie" /></div>
                    </Link>
                </div>
                <CarouselItems title="A new season essential" />
                <HotProducts />
                <SaleCollections />
                <NewCollection />
                <CarouselItems title="A new season essential" />
                <OnSale />
                <LogoSlid />
                <CoastalEdition />
            </div>
        </>
    )
}

export default Home