import './dashboard.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage';
import Modal from 'react-modal';
import { app } from '../../firebase';
import NaviagtionComponent from '../../components/navigation/navigationComponent';
import ProductFormComponent from '../../components/form/productFormComponent';
import ProductCardComponent from '../../components/card/productCardComponent';

function DashboardScreen() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [formValues, setFormValues] = useState(null);

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const db = getFirestore(app);
  const productCollectionRef = collection(db, "products");
  const storage = getStorage();


  useEffect(() => {
    if (isAuthenticated) {
      if (productList.length == 0) {
        getProducts();
      }
    } else {
      navigate("/");
    }
  }, []);

  const getProducts = async () => {
    let products = [];

    const querySnapshot = await getDocs(productCollectionRef);
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        productName: doc.data().product_name,
        price: doc.data().price,
        description: doc.data().description,
        weight: doc.data().weight,
        imageUrl: doc.data().image_url,
      });
    });
    setProductList(products);
  }

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    getProducts();
  }

  const updateProduct = async (values, file) => {
    const { id, productName, price, description, weight } = values;
    let productDetail = {
      product_name: productName,
      price: price,
      description: description,
      weight: weight,
      image_url: file ? file : '',
    }
    await updateDoc(doc(db, 'products', id), productDetail);
    getProducts();
    toggleModal();
  }

  const addProduct = async (values, file) => {
    const { productName, price, description } = values;
    let productDetail = {
      product_name: productName,
      price: price,
      description: description,
      image_url: file ? file : '',
    }
    let response = await addDoc(productCollectionRef, productDetail);
    if (response.id) {
      getProducts();
      toggleModal();
    } else {
      // handleSignupErrorDialogState()
    }
  }

  const toggleModal = (status) => setIsOpen(status);

  const setFormValueForPostRequest = () =>
    setFormValues({ id: '', productName: '', price: '', description: '', weight: '', });

  const setFormValueForPutRequest = (product) =>
    setFormValues({
      id: product.id,
      productName: product.productName,
      price: product.price,
      description: product.description,
      weight: product.weight,
    });


  return (
    <>
      <NaviagtionComponent activeIndex={0} />
      <div className="container-fluid">
        <div className="row justify-content-between mt-5">
          <div className="col-4">
            <h2> Products </h2>
          </div>
          <div className="col-1">
            <button
              className='btn btn-add btn-block'
              onClick={() => {
                setFormValueForPostRequest();
                toggleModal(true);
              }}>
              Add +
            </button>
          </div>
        </div>
        <div className='row'>
          {productList.map((product) =>
            <div className='col-3 mb-4'>
              <ProductCardComponent
                product={product}
                deleteProduct={() => deleteProduct(product.id)}
                editProduct={() => {
                  setFormValueForPutRequest(product);
                  toggleModal(true);
                }} />
            </div>
          )}
        </div>
      </div>

      {modalIsOpen &&
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => toggleModal(false)}>
          <ProductFormComponent
            formValues={formValues}
            toggleModal={(status) => toggleModal(status)}
            addProduct={(values, file) => addProduct(values, file)}
            updateProduct={(values, file) => updateProduct(values, file)} />
        </Modal>}
    </>
  );
}

export default DashboardScreen;