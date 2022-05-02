import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc} from "firebase/firestore";
import { app } from '../../firebase';
import NaviagtionComponent from '../../components/navigation/navigationComponent';

function OrderScreen() {
    const [orderList, setOrderList] = useState([]);

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const navigate = useNavigate();

    const db = getFirestore(app);
    const orderCollectionRef = collection(db, "orders");

    useEffect(() => {
        if (isAuthenticated) {
            getOrders();
        } else {
            navigate("/");
        }
    }, []);

    const onOrderDiscardHandler = async (id) => {
        let orderDetail = {
            status: 'DISCARD'
        }
        await updateDoc(doc(db, 'orders', id), orderDetail);
        getOrders();
    }

    const onOrderDeliveredHandler = async (id) => {
        let orderDetail = {
            status: 'DELIVERED'
        }
        await updateDoc(doc(db, 'orders', id), orderDetail);
        getOrders();
    }


    const getOrders = async () => {
        let orders = [];
        let orderDocCollection = [];
        let orderDocCollectionWithProductDetail = [];
        let orderDocCollectionWithUserDetail = [];

        const querySnapshot = await getDocs(orderCollectionRef);
        querySnapshot.forEach((orderDoc) => {
            orderDocCollection.push({
                id: orderDoc.id,
                date: orderDoc.data().date ? moment(new Date(orderDoc.data().date.seconds*1000)).format('DD-MM-YYYY')  : '-',
                status: orderDoc.data().status,
                productId: orderDoc.data().product_id,
                userId: orderDoc.data().user_id,
                address:  orderDoc.data().address ? orderDoc.data().address: '',
                userName: orderDoc.data().userName ? orderDoc.data().userName : '',
                phonenumber:  orderDoc.data().phonenumber ? orderDoc.data().phonenumber: '',
                postCode:  orderDoc.data().postCode ? orderDoc.data().postCode: '',
            });
        });

        for (const order of orderDocCollection) {
            const productQuerySnapshot = doc(db, 'products', order.productId);
            const docSnap = await getDoc(productQuerySnapshot);

            try { 
                orderDocCollectionWithProductDetail.push({
                    ...order,
                    productName: docSnap.data().product_name,
                    price: docSnap.data().price,
                })
            } catch (error) { }
        }

        for (const order of orderDocCollectionWithProductDetail) {
            if(order.userId){
                const userQuerySnapshot = doc(db, 'users', order.userId);
                const docSnap = await getDoc(userQuerySnapshot);
                try {
                    orderDocCollectionWithUserDetail = {
                        ...order,
                        userName: `${docSnap.data().first_name} ${docSnap.data().last_name}`,
                        address: docSnap.data().address ? docSnap.data().address : '',
                        phonenumber: docSnap.data().phonenumber ? docSnap.data().phonenumber : '',
                        postCode:  docSnap.data().postCode ? docSnap.data().postCode : '',
                    }
                    orders.push(orderDocCollectionWithUserDetail);
                } catch (error) { }
            }else{
                orderDocCollectionWithUserDetail = {
                    ...order,
                }
                orders.push(orderDocCollectionWithUserDetail);
            }
        }
        setOrderList(orders);
    }

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
                                <th scope="col" className='text-white'>Product Name</th>
                                <th scope="col" className='text-white'>Phone Number</th>
                                <th scope="col" className='text-white'>Amount</th>
                                <th scope="col" className='text-white'>Address</th>
                                <th scope="col" className='text-white'>Post Code</th>
                                <th scope="col" className='text-white'>Order Date</th>
                                <th scope="col" className='text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((order, index) => {
                                console.log("date", order.date)
                                return (
                                    <tr key={index}>
                                        <td>{order.id}</td>
                                        <td>{order.userName}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.phonenumber}</td>
                                        <td>{`\u00A3 ${order.price}`}</td>
                                        <td>{order.address}</td>
                                        <td>{order.postCode}</td>
                                        <td>{order.date}</td>
                                        <td>
                                            {order.status.toUpperCase() == 'PLACED' && <button className='btn btn-danger mx-2' onClick={() => onOrderDiscardHandler(order.id)}>
                                                {'Discard'}
                                            </button>}
                                            {order.status.toUpperCase() == 'PLACED' &&
                                            <button className='btn btn-success mx-2' onClick={() => onOrderDeliveredHandler(order.id)}>
                                                {'Delivered'}
                                            </button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default OrderScreen;