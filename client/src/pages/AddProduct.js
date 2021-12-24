import { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toaster } from 'react-hot-toast';
import { addProduct } from '../asyncMethod/asyncAction';
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const validationSchema = Yup.object({
    p_name: Yup.string().required('Product name must be Require'),
    actual_price: Yup.number().required('Actual price must be Require'),
    discount_price: Yup.number().required("Actual price must be Require"),
    catagari: Yup.string().required('Product catagari must be Require'),
    p_photo: Yup.mixed().nullable().required("Product photo must be Require")
        .test(
            "FILE_FORMAT",
            "Uploaded file has unsuported format.",
            (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
        ),
});

const AddProduct = () => {
    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    return (
        <div className="container">
            <Toaster />
            <div className="row my-5">
                <div className="col-12 mb-4">
                    <h3 className="text-center">Add Product Detail</h3>
                </div>
                <div className="col-sm-10 col-md-8 col-xl-6 mx-auto">
                    <Formik
                        initialValues={{
                            p_photo: '',
                            p_name: '',
                            actual_price: '',
                            discount_price: '',
                            catagari: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            //console.log(values);
                            //this function in asycMethod folder
                            addProduct(values);
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="my-2">
                                    <input type="file" name="p_photo" hidden ref={fileRef}
                                        onChange={(e) => {
                                            setFieldValue("p_photo", e.target.files[0]);
                                            if (e.target.files[0]) {
                                                //setImage(e.target.files[0]);
                                                const reader = new FileReader();
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = () => setPreview(reader.result);
                                            } else {
                                                setPreview(null);
                                            }
                                        }}
                                    />
                                    <div className="my-1">
                                        {
                                            preview && <img src={preview} alt="preview" width="100%" height="100%" />
                                        }
                                    </div>
                                    <button onClick={(e) => { fileRef.current.click(); e.preventDefault() }}
                                        className="btn btn-primary">Upload Product Photo</button>
                                    <div className="error"><ErrorMessage name="p_photo" /></div>
                                </div>
                                <div class="form-floating">
                                    <Field type="name" name="p_name" class="form-control"
                                        id="floatingName" placeholder="Enter product name" />
                                    <label for="floatingName">Enter product name</label>
                                </div>
                                <div className="error mb-3"><ErrorMessage name="p_name" /></div>
                                <div class="form-floating">
                                    <Field type="number" name="actual_price" class="form-control"
                                        id="actualPrice" placeholder="Enter actual price" />
                                    <label for="actualPrice">Actual Price</label>
                                </div>
                                <div className="error mb-3"><ErrorMessage name="actual_price" /></div>
                                <div class="form-floating">
                                    <Field type="number" name="discount_price" class="form-control"
                                        id="discoutPrice" placeholder="Enter discount price" />
                                    <label for="discount_price">Enter discount price</label>
                                </div>
                                <div className="error mb-3"><ErrorMessage name="discount_price" /></div>
                                <div class="form-floating">
                                    <Field type="text" name="catagari" class="form-control"
                                        id="product_catagari" placeholder="Enter product catagari" />
                                    <label for="product_catagari">Enter product catagari</label>
                                </div>
                                <div className="error mb-3"><ErrorMessage name="catagari" /></div>
                                <div className="my-3">
                                    <button type="submit" className="btn btn-success" style={{ width: "100%" }}>Submit</button>
                                </div>
                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;