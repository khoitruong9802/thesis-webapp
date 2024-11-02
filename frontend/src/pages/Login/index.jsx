import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as setLoginTrue } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginUser } from "../../services/userServices";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await loginUser(formData);
      if (res.status === 200) {
        localStorage.setItem("refreshToken", res.data.refresh_token);
        localStorage.setItem("accessToken", res.data.access_token);
        dispatch(setLoginTrue());
        navigate("/dashboard");
      }
    } catch (err) {
      setErrMessage(
        "Sorry, your username or your password was incorrect. Please double-check your password."
      );
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:3001/google-login", {
        token: credentialResponse.credential,
      });

      const { token } = res.data; // JWT string from backend

      // Optionally decode the token for user information
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);

      // Store JWT token
      localStorage.setItem("authToken", decodedToken);
      alert(`Welcome, ${decodedToken.name || "User"}!`);

      // Redirect to a protected route
      dispatch(setLoginTrue());
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed, please try again.");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
    alert("Google login failed. Please try again.");
  };

  return (
    <Loading isLoading={isLoading}>
      <div className="flex justify-center items-start h-screen">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-6 mt-10 p-8 rounded-md w-[350px] border border-blue-300">
            <p className="text-center text-xl font-bold">Smart farm</p>
            <div className="flex flex-col gap-y-2">
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                  }}
                  className="block w-full pt-3 pb-1 px-3 text-gray-900 bg-transparent rounded-md border border-blue-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="username"
                  className={`cursor-text absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}
                >
                  Username
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  className="block w-full pt-3 pb-1 px-3 text-gray-900 bg-transparent rounded-md border border-blue-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="password"
                  className={`cursor-text absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}
                >
                  Password
                </label>
              </div>

              <button
                onClick={login}
                className="bg-blue-500 rounded-xl font-medium text-white p-[6px] mt-1 hover:bg-blue-600"
              >
                Log in
              </button>

              <p className="text-red-600 text-sm">{errMessage}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-[110px] h-[1px] bg-gray-300"></div>
              <p className="text-sm font-medium text-gray-500">OR</p>
              <div className="w-[110px] h-[1px] bg-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                useOneTap
              />
            </div>

            <div className="text-center cursor-pointer">
              <p className="text-xs text-gray-700">Forgot password?</p>
            </div>
          </div>
          <div className="border border-blue-300 p-4 rounded-md text-center">
            <p>
              Don&apos;t have an account?{" "}
              <span className="text-blue-500 font-bold cursor-pointer">
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Login;
