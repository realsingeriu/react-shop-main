import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import purchaseService from "../../services/Purchase.service";
import userService from "../../services/user.service";
import { clearCurrentUser } from "../../store/actions/user";
import { Role } from "../../models/Role";

const Profile = () => {
  const [purchaseList, setPurchaseList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPurchaseData = () => {
    purchaseService.getAllPurchases().then((response) => {
      const purchases = response.data;

      setPurchaseList(purchases);

      // 총 주문 가격 및 갯수 계산
      const totalPrice = purchases.reduce(
        (total, purchase) => total + purchase.price,
        0
      );
      setTotalPrice(totalPrice);

      const totalOrders = purchases.length;
      setTotalOrders(totalOrders);
    });
  };

  useEffect(() => {
    // 최초 로딩 시 데이터 가져오기
    fetchPurchaseData();

    // 1초마다 데이터 갱신
    const intervalId = setInterval(() => {
      fetchPurchaseData();
    }, 1000);

    // 컴포넌트 언마운트 시 clearInterval 호출하여 갱신 중지
    return () => clearInterval(intervalId);
  }, []);

  const changeRole = () => {
    // 현재 유저의 role이 ADMIN이면 유저로 아니면 ADMIN으로 newRole를 만듬
    const newRole = currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

    userService
      .changeRole(newRole)
      .then(() => {
        //clear session
        dispatch(clearCurrentUser()); // 유저를 클리어
        window.location.href = "/login"; // 권한 변경시 로그인 페이지로 이동
      })
      .catch((err) => {
        setErrorMessage("예기치 않은 에러가 발생했습니다.");
        console.log(err);
      });
  };

  return (
    <div className="mt-5">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <h3>구매한 상품들</h3>
            </div>
            <div className="col-6 text-end">
              현재 유저의 권한은 <strong>{currentUser?.role} </strong> 입니다.
              <button className="btn btn-primary ms-3" onClick={changeRole}>
                권한 변경
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div>
            <p>총 주문 가격: {totalPrice.toLocaleString()} 원</p>
            <p>총 주문 갯수: {totalOrders} 개</p>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">상품명</th>
                <th scope="col">가격</th>
                <th scope="col">구매일자</th>
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((item, ind) => (
                <tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>{item.name}</td>
                  <td>{`${item.price.toLocaleString()} 원`}</td>
                  <td>{new Date(item.purchaseTime).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
