import { useRef, useState } from "react";
import { BiPhone, BiLocationPlus, BiMailSend } from "react-icons/bi";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../helpers/routes";

const Contact = () => {
  const formRef = useRef(null);

  const [dataContact, setDataContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setDataContact({ ...dataContact, [property]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      userName: dataContact.name,
      toEmailAddress: "rodarrentadm@outlook.com",
      replyToEmailAddress: dataContact.email,
      subject: "Contact",
      text: dataContact.message,
      template: "normal",
    };
    const response = await axios.post(`${API_BASE_URL}/sendemail`, body);
    formRef.current.reset();
    toast.success(`${response.data}!`, { position: "top-left" });
  };

  return (
    <div className="min-h-[calc(100vh-112px)] 2xl:px-20 xl:px-20 lg:px-10 md:px-10 xs:px-0 transition duration-300 dark:bg-slate-900 dark:text-gray-100">
      <h1 className="text-4xl font-normal">Get in Touch!</h1>
      <div className="min-h-[calc(100vh-152px)] xs:mt-4 w-full flex justify-center items-center">
        <div className="flex 2xl:flex-row xl:flex-row lg:flex-row xs:flex-col-reverse xs:border-none border drop-shadow-md bg-white rounded-lg 2xl:w-2/3 xl:w-4/5 lg:w-5/6 md:w-5/6 xs:w-full transition duration-300 dark:bg-slate-900 dark:text-gray-100">
          <form ref={formRef} className="basis-3/4 p-5" action="">
            <h2 className="text-2xl font-medium">Send us a message</h2>
            <div className=" mt-4">
              <div className="w-full flex justify-between">
                <div className="flex w-2/5 flex-col">
                  <label htmlFor="name">Your Name:</label>
                  <input
                    onChange={handleChange}
                    className=" p-1 dark:bg-slate-950 rounded-lg mt-2 border drop-shadow-md"
                    type="text"
                    name="name"
                    id=""
                  />
                </div>
                <div className="flex w-2/5 flex-col">
                  <label htmlFor="email">E-mail:</label>
                  <input
                    onChange={handleChange}
                    className=" p-1 dark:bg-slate-950 rounded-lg mt-2 border drop-shadow-md"
                    type="email"
                    name="email"
                    id=""
                  />
                </div>
              </div>
              <div className="w-full flex justify-between mt-3">
                <div className="flex w-2/5 flex-col">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    onChange={handleChange}
                    className=" p-1 dark:bg-slate-950 rounded-lg mt-2 border drop-shadow-md"
                    type="text"
                    name="phone"
                    id=""
                  />
                </div>
                <div className="flex w-2/5 flex-col">
                  <label htmlFor="city">City</label>
                  <input
                    onChange={handleChange}
                    className=" p-1 dark:bg-slate-950 rounded-lg mt-2 border drop-shadow-md"
                    type="text"
                    name="phone"
                  />
                </div>
              </div>
              <div className="w-full flex mt-3">
                <div className="flex-col w-full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    onChange={handleChange}
                    className=" p-1 dark:bg-slate-950 w-full rounded-lg mt-2 border drop-shadow-md resize-none"
                    name="message"
                    id=""
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmit}
                className=" bg-blue px-8 drop-shadow-md text-gray-100 rounded-xl transition duration-300 hover:drop-shadow-none"
              >
                Send
              </button>
            </div>
          </form>
          <div className=" bg-blue basis-1/4 p-6 text-gray-100 2xl:rounded-r-lg xl:rounded-r-lg lg:rounded-r-lg md:rounded-r-lg xs:rounded-t-lg">
            <h3 className="text-xl ">Contact Information</h3>
            <hr className="mt-4 text-gray-50" />
            <div className="flex mt-10 items-center text-lg">
              <BiLocationPlus />
              <p className="ml-2">Tacuarí 125, Microcentro, Buenos Aires</p>
            </div>
            <div className="flex mt-10 items-center text-lg ">
              <BiPhone />
              <p className="ml-2">+54 9 11 4357559</p>
            </div>
            <div className="flex mt-10 items-center text-lg ">
              <BiMailSend />
              <p className="ml-2">rodarRent@hotmail.com</p>
            </div>
            <hr className="mt-12" />
            <div className="flex  mt-12 text-3xl justify-between w-3/5">
              <FaInstagram />
              <FaLinkedinIn />
              <FaTwitter />
            </div>
          </div>
        </div>
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

export default Contact;
