import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
      <div className="grid grid-cols-2 items-center bg-[#FF2171] p-4 rounded-lg">
        <div className="text-center flex items-center m-5 bg-white pt-5 pb-10 rounded-md">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl p-5 m-1 text-[#FF2171]">
              Log-in to Mann Kare{" "}
            </h1>

            <div className="m-4 text-lg text-left p-3">
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                value={data.email}
                required
                onChange={handleChange}
              />
            </div>

            <div className="m-4 text-lg text-left p-3">
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={data.password}
                required
                onChange={handleChange}
              />
            </div>

            {error && <div>{error}</div>}

            <button className="m-5 text-xl" type="submit">
              Sign-in
            </button>
          </form>
        </div>

        <div className="text-center items-center m-5 grid grid-rows-2 bg-[#FF2171]">
          <h1 className="text-2xl m-2 text-white">New Here ?</h1>
          <Link to="/signup">
            <button className="text-xl text-white" type="button">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
