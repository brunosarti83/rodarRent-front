import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { successLogin } from "../../helpers/Log";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from "react-toastify";

const GoogleAuthAux = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasEffectRun = useRef(false);

  const queryParams = new URLSearchParams(location.search);
  const userParam = queryParams.get("userData");
  const userData = userParam ? JSON.parse(userParam) : null;

  useEffect(() => {
    if (!hasEffectRun.current) {
      successLogin(userData, navigate);
      hasEffectRun.current = true;
    }
  }, []);

  return (
    <div>
      <Loader />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default GoogleAuthAux;
