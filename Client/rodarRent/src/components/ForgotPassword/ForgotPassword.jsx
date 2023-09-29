import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../redux/actions";
import { forgotpasswordUrl, API_BASE_URL } from "../../helpers/routes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(forgotpasswordUrl, {
        email,
      });
      //envio el mail con instrucciones
      const body = {
        userName: response.data.name,
        toEmailAddress: email,
        replyToEmailAddress: "rodarrentadm@outlook.com",
        text: response.data.password,
        subject: "Password reset",
        template: "resetPassword",
      };
      await axios.post(`${API_BASE_URL}/sendemail`, body);

      onClose(
        toast.success(`An email with instructions has been sent to ${email}`, {
          position: "top-left",
        })
      );
      setTimeout(async () => {
        setEmail("");
      }, 4000);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={handleCloseModal}
      ></div>
      <div className="bg-white p-4 rounded-lg z-50">
        <h2 className="font-poppins p-2 text-3xl">Forgot Your Password?</h2>
        <hr className="ml-8 mr-8 p-2 text-gray" />
        <p className="font-poppins text-sm flex m-1 justify-start">
          Enter your email.
        </p>
        <form onSubmit={handleResetPassword}>
          <input
            className="w-full font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="text-right">
            <button
              className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
              type="submit"
              disabled={isLoading}
              onClick={handleResetPassword}
            >
              {isLoading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>
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

export default ForgotPassword;
