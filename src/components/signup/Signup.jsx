import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
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
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="justify-center flex items-center h-screen bg-gray-200">
      <div className="grid grid-cols-2 items-center p-4 bg-[#FF2171] rounded-lg">
        <div className="text-center items-center m-5 grid grid-rows-2 bg-[#FF2171]">
          <h1 className="text-2xl m-2 text-white">Welcome Back to Mann Kare</h1>
          <Link to="/login">
            <button className="text-lg text-white" type="button">
              Sign in
            </button>
          </Link>
        </div>

        <div className="text-center flex items-center bg-white pt-5 pb-10 rounded-md">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl pb-2 m-1 text-[#FF2171]">Create Account</h1>

            <div className="grid grid-row-2">
              <div className="grid grid-cols-2">
                <div className="m-4 text-lg text-left">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={data.firstName}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="m-4 text-lg text-left">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={data.lastName}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-row-2">
                <div className="m-4 text-lg text-left">
                  <input
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={data.email}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="m-4 text-lg text-left">
                  <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {error && <div>{error}</div>}

            <button className="m-5 text-xl" type="submit" >
              Sign-up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
