import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import NaviagtionComponent from '../../components/navigation/navigationComponent';

function OrderScreen() {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
         
        } else {
          navigate("/");
        }
      }, []);

    return (
        <>
            <NaviagtionComponent activeIndex={1} />
            <div className="container-fluid">
                <div className="row justify-content-between mt-5">
                    <div className="col-4">
                        <h2> Orders </h2>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="thead-light bg-dark">
                            <tr>
                                <th scope="col" className='text-white'>Order Number</th>
                                <th scope="col" className='text-white'>Customer Name</th>
                                <th scope="col" className='text-white'>Address</th>
                                <th scope="col" className='text-white'>Amount</th>
                                <th scope="col" className='text-white'>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default OrderScreen;