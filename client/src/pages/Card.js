import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userEmail } from "../asyncMethod/asyncAction";
import { REMOVE_PRODUCT } from '../store/ProductReducer';

const Card = () => {
    const [product, setProduct] = useState();
    const [email, setEmail] = useState();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { cardProduct } = useSelector(state => state.ProductReducer);
    // Product Remove Funtion...
    const handleRemove = (id) => {
        dispatch({ type: REMOVE_PRODUCT, paylood: id });
    }
    // Add Product Funtion...
    const handleSubmit = () => {
        if (!email) {
            setShow(true);
            toast.error("Plz enter your email");
        } else {
            userEmail(email);
        }
    }
    useEffect(() => {
        setProduct(cardProduct);
    }, [cardProduct]);
    return (
        <div className="container">
            <Toaster />
            <div className="row my-5">
                <div className="col-sm-10 ml-auto">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product ? product.map((val) => (
                                <tr>
                                    <td><img src={`/ProductImages/${val.photo}`} alt="..." width="50px" /></td>
                                    <td>{val.p_name}</td>
                                    <td>{val.quantity}</td>
                                    <td><p>{val.discount_price}</p></td>
                                    <td>{val.discount_price * val.quantity}</td>
                                    <td>
                                        <button onClick={() => handleRemove(val.id)} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </table>
                    {show ? <div class="form-floating my-3 col-sm-8">
                        <input type="email" className="form-control"
                            id="floatingEmail" placeholder="Enter your email..."
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label for="floatingEmail">Enter your email...</label>
                    </div> : ""}
                    <button className="btn btn-success" onClick={() => handleSubmit()}>Checkout</button>
                </div>
            </div>
        </div>
    )
}
export default Card;