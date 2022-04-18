import './loginScreen.css';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginFormComponent from '../../components/form/loginFormComponent';

function LoginScreen() {
  const [showLoginErrorMessage, setShowLoginErrorMessage] = useState(false);
  const auth = getAuth(app);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated]);

  const handleLogin = (values) => {
    const { email, password } = values;
    setShowLoginErrorMessage(false);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        if (userCredentials.user.uid) {
          dispatch({ type: 'IS_AUTHENTICATED' });
          setShowLoginErrorMessage(false);
        } else {
          dispatch({ type: 'NOT_AUTHENTICATED' });
          setShowLoginErrorMessage(true);
        }
      })
      .catch(error => {
        dispatch({ type: 'RESET_AUTHENTICATION' });
        setShowLoginErrorMessage(true);
      });
  }

  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">

                    <div className="text-center">
                      <img src={logo}
                        className="rounded-circle mb-3"
                        style={{ width: "185px" }} alt="logo" />
                      <h3 className="mt-1 mb-5 pb-1">We are Labdhi Vinay Team</h3>
                    </div>

                    <h5>Please login to your account</h5>
                    {showLoginErrorMessage &&
                      <div class="alert alert-danger" role="alert">
                        Invalid email address or password
                      </div>}
                    <LoginFormComponent handleLogin={(values) => handleLogin(values)} />
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginScreen;