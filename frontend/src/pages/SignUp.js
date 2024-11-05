import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GiCancel } from "react-icons/gi";
import backimg from '../images/background.jpg';

const baseUrl = process.env.REACT_APP_API_URL;

const Signup = ({ setIsAuthenticated }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/signup`;
      const { data: res } = await axios.post(url, data);
      setIsAuthenticated(true); // Set authentication state to true
      navigate("/"); // Navigate to the home page
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-full h-full flex flex-col">
        <div className="h-[68vh] w-full relative flex items-center justify-center">
          <img src={backimg} className="absolute top-0 left-0 w-full h-full object-cover" alt="background" />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
        </div>
        <div className="h-[32vh] w-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-lg">
          <div className="bg-gray-100 flex items-center justify-center w-full h-full rounded-lg shadow-lg">
            <div className="flex w-full h-full rounded-lg">
              <div className="flex flex-col items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 rounded-l-lg w-[36%]">
                <h1 className="text-white text-3xl">Welcome Back</h1>
                <Link to="/signin">
                  <button className="mt-4 w-[180px] py-3 bg-white rounded-full font-bold text-sm text-center cursor-pointer">
                    Sign in
                  </button>
                </Link>
              </div>
              <div className="flex-2 flex flex-col items-center justify-center bg-white rounded-r-lg w-[64%]">
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                  <h1 className="text-4xl mb-4">Create Account</h1>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={data.firstName}
                    required
                    className="w-[370px] py-4 px-3 bg-gray-100 rounded-lg mb-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={data.lastName}
                    required
                    className="w-[370px] py-4 px-3 bg-gray-100 rounded-lg mb-2 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className="w-[370px] py-4 px-3 bg-gray-100 rounded-lg mb-2 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="w-[370px] py-4 px-3 bg-gray-100 rounded-lg mb-2 text-sm"
                  />
                  {error && <div className="w-[370px] py-4 px-3 bg-red-600 text-white rounded-lg text-center mb-2">{error}</div>}
                  <button type="submit" className="w-[180px] py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-bold text-sm mt-4 cursor-pointer">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 transform -translate-x-10 translate-y-4">
            <Link to="/">
              <GiCancel size={30} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
