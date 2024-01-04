import React, { useEffect, useRef, useState } from 'react';
import productService from '../../services/Product.service';
import ProductSave from '../../components/ProductSave';
import Product from '../../models/Product';
import ProductDelete from '../../components/ProductDelete';

const Admin = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(new Product('', '', 0));
  const [errorMessage, setErrorMessage] = useState('');
  const saveComponent = useRef(); //새로저장,수정 모달
  const deleteComponent = useRef(); //삭제 모달

  useEffect(() => {
    productService.getAllProducts().then((response) => {
      setProductList(response.data);
    });
  }, []);

  const createProductRequest = () => {
    saveComponent.current?.showProductModal(); //모달 보이게 됨
  };
  const saveProductWatcher = (product) => {
    let itemIndex = productList.findIndex((item) => item.id === product.id);
    //수정하는 경우
    if (itemIndex !== -1) {
      const newList = productList.map((item) => {
        if (item.id === product.id) {
          return product;
        }
        return item;
      });
      setProductList(newList);
    } else {
      //새로 저장하는 경우
      const newList = productList.concat(product);
      setProductList(newList); //제품 리스트 업데이트
    }
  };
  const editProductRequest = (item) => {
    console.log(item);
    setSelectedProduct(item);
    saveComponent.current?.showProductModal();
  };
  const deleteProduct = (item) => {
    if (!window.confirm('정말로 삭제하겠습니까?')) return;
    productService
      .deleteProduct(item)
      .then((_) => {
        setProductList(productList.filter((p) => p.id !== item.id));
      })
      .catch((err) => {
        setErrorMessage('삭제중 에러발생!');
        console.log(err);
      });
  };
  const deleteProductRequest = (item) => {
    console.log(item);
    setSelectedProduct(item);
    deleteComponent.current?.showDeleteModal(); //삭제모달 열기
  };

  return (
    <div className="container">
      <div className="card mt-5">
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>모든 제품들</h3>
            </div>

            <div className="col-6 text-end">
              <button onClick={createProductRequest} className="btn btn-primary">
                새 제품
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr key={index}>
                  <th scope="col">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price} 원</td>
                  <td>{new Date(item.createTime).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => editProductRequest(item)}
                      className="btn btn-primary me-1"
                    >
                      수 정
                    </button>
                    <button onClick={() => deleteProductRequest(item)} className="btn btn-danger">
                      삭 제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductSave
        ref={saveComponent}
        product={selectedProduct}
        onSaved={(p) => saveProductWatcher(p)}
      />
      <ProductDelete ref={deleteComponent} />
    </div>
  );
};

export default Admin;
