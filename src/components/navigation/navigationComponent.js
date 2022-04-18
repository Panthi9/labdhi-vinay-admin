import './navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function NaviagtionComponent(props) {
    const {activeIndex} = props;

    const navigate = useNavigate();
    const dispatch  = useDispatch();

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <Link className='navbar-brand mx-4' to="/home"> 
                    Labdhi Vinay
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${activeIndex == 0 ? 'text-white' : ''}`} to="/home" > Products </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeIndex == 1 ? 'text-white' : ''}`} to="/order" > Orders </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mx-2">
                       <li className="nav-item">
                            <Link 
                                className={`nav-link ${activeIndex == 2 ? 'text-white' : ''}`} 
                                to="/" 
                                onClick={() => {
                                    dispatch({type:'RESET_AUTHENTICATION'});
                                    navigate('/');
                                }}> 
                                Logout 
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>

    );
}

export default NaviagtionComponent;