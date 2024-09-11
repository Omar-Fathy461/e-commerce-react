import React, { useEffect, useState, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../../store/slices/products/productsSlice';
import Loading from '../../views/Loading';
// Lazy loading for CarouselItems
const CarouselItems = React.lazy(() => import('../common/Carousel'));
import '../../assets/sass/productsList.scss';

const Filters = ({ handleColorFilter, handlePriceFilter }) => (
    <div className="sidbar col-lg-2">
        <h4>Filters</h4>
        <h5>colors</h5>
        <div className="color-products">
            <button className='grey' onClick={() => handleColorFilter('Grey')}></button>
            <button className='jean-blue' onClick={() => handleColorFilter('Jean Blue')}></button>
            <button className='navy' onClick={() => handleColorFilter('Navy')}></button>
            <button className='black' onClick={() => handleColorFilter('Black')}></button>
            <button className='white' onClick={() => handleColorFilter('White')}></button>
            <button className='toasted-coconut' onClick={() => handleColorFilter('Toasted Coconut')}></button>
            <button className='cream' onClick={() => handleColorFilter('Cream')}></button>
            <button className='coca' onClick={() => handleColorFilter('Coca')}></button>
            <button className='brown' onClick={() => handleColorFilter('Brown')}></button>
            <button className='tan' onClick={() => handleColorFilter('Tan')}></button>
            <button className='heathered-grey' onClick={() => handleColorFilter('Heathered Grey')}></button>
            <button className='heathered-green' onClick={() => handleColorFilter('Heathered Green')}></button>
        </div>
        <h5>price</h5>
        <div className="price-filters">
            <button onClick={() => handlePriceFilter('below50')}>Below $50</button>
            <button onClick={() => handlePriceFilter('50to100')}>$50 - $100</button>
            <button onClick={() => handlePriceFilter('above100')}>Above $100</button>
        </div>
    </div>
);

const ProductsList = () => {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const { loading, items } = useSelector((state) => state.products);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [priceRange, setPriceRange] = useState(null);
    const [filterMessage, setFilterMessage] = useState('');

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    useEffect(() => {
        dispatch(getProducts({ categoryName }));
    }, [categoryName, dispatch]);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    const handleColorFilter = useCallback((color) => {
        setIsFiltering(true);
        const filtered = items.filter(product => product.color.includes(color));
        setFilteredItems(filtered);
        setIsFiltering(false);

        if (filtered.length === 0) {
            setFilterMessage(`No products found for color: ${color}`);
        } else {
            setFilterMessage('');
        }
    }, [items]);

    const handlePriceFilter = useCallback((range) => {
        setPriceRange(range);
        setIsFiltering(true);
        let filtered;
        switch (range) {
            case 'below50':
                filtered = items.filter(product => product.price < 50);
                break;
            case '50to100':
                filtered = items.filter(product => product.price >= 50 && product.price <= 100);
                break;
            case 'above100':
                filtered = items.filter(product => product.price > 100);
                break;
            default:
                filtered = items;
                break;
        }
        setFilteredItems(filtered);
        setIsFiltering(false);

        if (filtered.length === 0) {
            setFilterMessage(`No products found for the selected price range.`);
        } else {
            setFilterMessage('');
        }
    }, [items]);

    return (
        <div>
            <div className='container'>
                <div className="productsList">
                    {loading || isFiltering ? (
                        ""
                    ) : (
                        <>
                            <Filters handleColorFilter={handleColorFilter} handlePriceFilter={handlePriceFilter} />
                            <div className="myProducts col-lg-10 col-md-4 col-sm-12">
                                {filterMessage && <div className="filter-message"><h3>{filterMessage}</h3></div>}
                                {filteredItems.length === 0 && !loading && !isFiltering && (
                                    <></>
                                )}
                                {filteredItems.map((el) => (
                                    <Link key={el.id} to={`products/${el.id}`}>
                                        <div className='product-card' style={{
                                            backgroundImage: isImageLoaded ? `url(${el.image[1]})` : 'none',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            position: 'relative',
                                        }}>
                                            <img src={el.image[0]} alt={el.title} onLoad={handleImageLoad} loading="lazy" />
                                            <h6>{el.title}</h6>
                                            <p>${el.price}.00</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                {/* Wrap CarouselItems with Suspense */}
                <Suspense fallback={<div>Loading Carousel...</div>}>
                    <CarouselItems title="Recently Viewed Products" className="text-start" />
                </Suspense>
            </div>
        </div >
    );
};

export default ProductsList;
