import React from 'react';
import { Route, Navigate, Outlet, useNavigate   } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authenticated, unauthenticated } from '../redux/actions'

const GuardedRoute = () => {
  const ax = useSelector((s) => s.isAuth);
  const base_URL = "http://localhost:5000/";
  const [data, setData] = React.useState(null);

  let navigate = useNavigate();

  const CheckCred = async () => {
    setData({ loading: true, isAuth: false });
    try {
      const res = await axios.get(base_URL, { withCredentials: true });
      setData(true);
    } catch (err) {
      console.error(err);
      setData(null);
    }
  };

  React.useEffect(() => {
    CheckCred();
  }, [ax]);

  if (data === null) {
    navigate("/login");
    return <>Token expired please login</>;
  }

  return <Outlet />;
}

export default GuardedRoute;