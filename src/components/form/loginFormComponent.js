import { Formik } from 'formik';
import * as yup from 'yup'

function LoginFormComponent(props) {
    const { handleLogin } = props;

    return (
        <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => handleLogin(values)} >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                return (
                    <>
                        <div>
                            <div className="form-outline mb-4 mt-4">
                                <label> Email </label>
                                <input
                                    type="email"
                                    id="form2Example11"
                                    className={`form-control ${touched.email ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}
                                    placeholder="Email address"
                                    onChange={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email} />
                                {(touched.email && errors.email) && <small className='text-danger'> {errors.email} </small>}
                            </div>

                            <div className="form-outline mb-4">
                                <label> Password </label>
                                <input
                                    type="password"
                                    id="form2Example22"
                                    className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                                    placeholder="*** **** **"
                                    onChange={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password} />
                                {(touched.password && errors.password) && <small className='text-danger'> {errors.password} </small>}
                            </div>

                            <div className="pt-1 mb-5 pb-1">
                                <button
                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                    type="button"
                                    onClick={handleSubmit}>
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    </>);
            }}
        </Formik>
    )
}

export default LoginFormComponent

const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})