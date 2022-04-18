import { Formik } from 'formik';
import * as yup from 'yup'

function ProductFormComponent(props) {
    const { formValues, toggleModal, addProduct, updateProduct } = props;

    const onSubmitHandler = (values) => {
        if (values.id) {
            updateProduct(values);
        } else {
            delete values.id;
            addProduct(values);
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
                                            <label> Sub Title </label>
                                            <input
                                                type="text"
                                                className={`form-control ${touched.subTitle  ? errors.subTitle ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Sub Title"
                                                onChange={handleChange('subTitle')}
                                                onBlur={handleBlur('subTitle')}
                                                value={values.subTitle} />
                                            {(touched.subTitle && errors.subTitle) && <small className='text-danger'> {errors.subTitle} </small>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-between align-items-center mt-2">
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label> Description </label>
                                            <textarea
                                                rows={5}
                                                className={`form-control ${touched.description  ? errors.description ? 'is-invalid' : 'is-valid' : ''}`}
                                                placeholder="Description"
                                                onChange={handleChange('description')}
                                                onBlur={handleBlur('description')}
                                                value={values.description} />
                                            {(touched.description && errors.description) && <small className='text-danger'> {errors.description} </small>}
                                        </div>
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
    subTitle: yup
        .string()
        .required('Subtitle is required'),
    description: yup
        .string()
        .required('Product description is Required'),
})