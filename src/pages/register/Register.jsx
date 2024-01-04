import React, { useEffect, useState } from 'react';
import User from '../../models/User';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerService } from '../../services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Register.css';

const Register = () => {
  const [user, setUser] = useState(new User('', '', ''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //유즈셀렉터로 스토어의 유저객체를 가져온다.
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    //시작시 유저의 id가 있으면 프로파일 페이지로
    if (currentUser?.id) {
      navigate('/profile');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitted(true); //submit 하면 true가 됨=>부트스트랩 유효성 검사 시작

    if (!user.username || !user.password || !user.name) {
      return;
    }

    setLoading(true);

    registerService(user)
      .then((ok) => {
        //가입 성공시 로그인 페이지로
        navigate('/login');
      })
      .catch((error) => {
        //가입 실패시 에러 메세지 표시
        console.log(error);
        if (error?.response?.status === 409) {
          setErrorMessage('같은 유저네임이 있습니다.');
        } else {
          setErrorMessage('예상하지 못한 에러가 발생했습니다.');
        }

        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card ms-auto me-auto p-3 shadow-lg custom-card">
        <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleRegister} noValidate className={submitted ? 'was-validated' : ''}>
          <div className="form-group mb-2">
            <label htmlFor="name">이 름</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="name"
              value={user.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">이름을 입력해주세요</div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="username">유저네임</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              value={user.username}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">유저네임을 입력해주세요</div>
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password">패스워드</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">패스워드를 입력해주세요</div>
          </div>

          <button className="btn btn-info text-white w-100 mt-3" disabled={loading}>
            가입하기
          </button>
        </form>
        <Link to="/login" className="btn btn-link" style={{ color: 'darkgray' }}>
          이미 계정이 있습니다.
        </Link>
      </div>
    </div>
  );
};

export default Register;
