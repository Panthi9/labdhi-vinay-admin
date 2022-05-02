import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useFileUpload } from 'use-file-upload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import { app } from '../../firebase';

function ProductFormComponent(props) {
    const { formValues, toggleModal, addProduct, updateProduct } = props;

    const [file, selectFile] = useFileUpload();
    const [filePath, setFilePath] = useState(null);

    const storage = getStorage(app);

    useEffect(() => {
        setFilePath(null);
    }, []);

    const onSubmitHandler = (values) => {
        if (values.id) {
            updateProduct(values, filePath);
        } else {
            delete values.id;
            addProduct(values, filePath);
        }
    }


    return (
        <Formik
            validationSchema={productValidationSchema}
            initialValues={formValues}
            onSubmit={values => onSubmitHandler(values)} >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                return (
                    <>
                        <div>
                            <div className="row justify-content-between align-items-center mt-2">
                                <div className="col-11">
                                    <h2> {values.id ? 'Edit' : 'Add New'} Product Details </h2>
                                </div>
                                <div className="col">
                                    <button
                                        className='btn btn-white btn-block'
                                        onClick={() => toggleModal(false)}>
                                        <h2> x </h2>
                                    </button>
                                </div>

                                <div className="row justify-content-between align-items-center mt-2">
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label> Product Name </label>
                                            <input
                                                type="text"
                                                className={`form-control ${touched.productName ? errors.productName ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Product Name"
                                                onChange={handleChange('productName')}
                                                onBlur={handleBlur('productName')}
                                                value={values.productName} />
                                            {(touched.productName && errors.productName) && <small className='text-danger'> {errors.productName} </small>}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label> Price </label>
                                            <input
                                                type="text"
                                                className={`form-control ${touched.price ? errors.price ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Price"
                                                onChange={handleChange('price')}
                                                onBlur={handleBlur('price')}
                                                value={values.price} />
                                            {(touched.price && errors.price) && <small className='text-danger'> {errors.price} </small>}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label> Weight </label>
                                            <input
                                                type="text"
                                                className={`form-control ${touched.weight ? errors.weight ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Weight"
                                                onChange={handleChange('weight')}
                                                onBlur={handleBlur('weight')}
                                                value={values.weight} />
                                            {(touched.weight && errors.weight) && <small className='text-danger'> {errors.weight} </small>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-between align-items-center mt-2">
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label> Description </label>
                                            <textarea
                                                rows={5}
                                                className={`form-control ${touched.description ? errors.description ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Description"
                                                onChange={handleChange('description')}
                                                onBlur={handleBlur('description')}
                                                value={values.description} />
                                            {(touched.description && errors.description) && <small className='text-danger'> {errors.description} </small>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-between align-items-center mt-2">
                                    <div className="col">
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => {
                                                selectFile({ accept: 'image/*' }, ({ source, name, size, file }) => {
                                                    const storageRef = ref(storage, `/${name}`);
                                                    const uploadTask = uploadBytes(storageRef, source);

                                                    getDownloadURL(uploadTask.snapshot.ref)
                                                        .then((url) => {
                                                            setFilePath(url);
                                                        })
                                                        .catch((error) => {
                                                            setFilePath(null);
                                                        });
                                                })
                                            }}>
                                            Click to Upload
                                        </button>
                                    </div>
                                </div>

                                <div className='row  mt-3'>
                                    <div className="col ">
                                        <button
                                            className='btn btn-success btn-block'
                                            onClick={handleSubmit}>
                                            {values.id ? 'EDIT' : 'ADD'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>);
            }}
        </Formik>
    )
}

export default ProductFormComponent

const productValidationSchema = yup.object().shape({
    productName: yup
        .string()
        .required('Product name is required'),
    price: yup
        .number()
        .required('Price is required'),
    weight: yup
        .string()
        .required('Weight is required'),
    description: yup
        .string()
        .required('Product description is Required'),
})