import './card.css';

function ProductCardComponent(props) {
    const { product, deleteProduct, editProduct } = props;

    return (
        <>
            <div className="card" key={product.id}>
                <div className='card-image' style={{height: 200, background:'grey'}} >
                    {product.imageUrl && 
                        <img 
                            src={product.imageUrl} 
                            height="200" 
                            width="100%"/>}
                </div>
                <div className="card-body">
                    <h5 className="card-title text-truncate">{product.productName}</h5>
                    <p className="card-text text-truncate">{`\u00A3 ${product.price}`}</p>
                    <p className='word'>{product.description}</p>
                </div>
                <div className="card-footer text-muted">
                    <button 
                        className='btn btn-delete mx-2' 
                        onClick={() => deleteProduct()}>
                        Delete
                    </button>
                    <button 
                        className='btn btn-edit mx-2'
                        onClick={() => editProduct()}>
                        Edit
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductCardComponent;