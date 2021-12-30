import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../asyncMethod/asyncAction";
import Pagination from "../component/Pagination";

const Home = () => {
    const { products, count, parPage } = useSelector(state => state.ProductReducer);
    // console.log(products);
    const dispatch = useDispatch();
    let {page} = useParams();
    if (page === undefined) {
        page = 1;
    }
    useEffect(() => {
        dispatch(fetchProducts(page));
    }, [page]);
    return (
        <div className="container">
            <div className="row my-5">
                {products ? products.map((val, ind) => {
                    return (
                        <div className="col-sm-6 col-md-3 col-xl-4 my-3" key={ind}>
                            <div className="card">
                                <Link to={`/product/${val._id}`}>
                                    <img src={`/ProductImages/${val.photo}`} className="card-img-top" alt="not found"height="350" />
                                </Link>
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <div className="price-section">
                                        <span className="text-decoration-line-through">${val.actual_price}</span>
                                        <span>${val.discount_price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : <div>Loading</div>}
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Pagination count={count} parPage={parPage} page={page} />
                </div>
            </div>
        </div>
    )
}
export default Home;