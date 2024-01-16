import productService from "../../services/Product.service";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Purchase from "../../models/Purchase";
import purchaseService from "../../services/Purchase.service";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    productService.getAllProducts().then((response) => {
      setProductList(response.data);
    });
  }, []);

  const purchase = (product) => {
    if (!currentUser?.id) {
      setErrorMessage("로그인하셔야 구매가능 합니다.");
      return;
    }
    const purchase = new Purchase(currentUser.id, product.id, product.price);

    purchaseService
      .savePurchase(purchase)
      .then(() => {
        setInfoMessage("구매완료!");
      })
      .catch((err) => {
        setErrorMessage("예상치 못한 에러가 발생했습니다.");
        console.log(err);
      });
  };

  return (
    <div className="mt-3">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {infoMessage && <div className="alert alert-success">{infoMessage}</div>}

      <div className="d-flex justify-content-around flex-wrap gap-3">
        {productList.map((item, ind) => (
          <div key={item.id} className="card home-card">
            <div className="card-body">
              <div className="card-title text-uppercase">{item.name}</div>
              <div className="card-subtitle text-muted">{item.description}</div>
            </div>

            <FontAwesomeIcon
              icon={faCartPlus}
              className="ms-auto me-auto product-icon"
            />

            <div className="row mt-2 p-3">
              <div className="col-6 mt-2 ps-3">{`${item.price.toLocaleString()}원`}</div>
              <div className="col-6">
                <button
                  className="btn btn-outline-success w-100"
                  onClick={() => purchase(item)}
                >
                  구매
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
