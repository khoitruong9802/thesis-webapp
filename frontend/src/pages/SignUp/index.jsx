import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createUser } from "../../services/userServices";

const checkUserInfo = (formData) => {
  if (formData.full_name.length === 0) {
    return [false, "Enter your fullname"];
  }
  if (formData.username.length < 8) {
    return [false, "Use 8 characters or more for your username"];
  }
  if (formData.password.length < 8) {
    return [false, "Use 8 characters or more for your password"];
  }
  if (formData.password !== formData.confirm_password) {
    return [false, "Those passwords didn't match. Try again."];
  }
  return [true, ""];
};

const SignUp = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "luongson1208",
    password: "123456789",
    confirm_password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const signup = async () => {
    const [isUserValid, errText] = checkUserInfo(formData);
    if (isUserValid) {
      setIsLoading(true);
      try {
        const res = await createUser(formData);
        if (res.status === 200) {
          navigate("/login");
        }
      } catch (err) {
        setErrMessage(err.response.data.message);
      }
      setIsLoading(false);
    } else {
      setErrMessage(errText);
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <div className="flex justify-center items-start h-screen">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-6 mt-10 p-8 rounded-md w-[350px] border border-blue-300">
            <p className="text-center text-xl font-bold">Smart farm</p>
            <p className="text-gray-500 font-medium text-center">
              Sign up to control devices and schedule
            </p>

            <div className="flex justify-center cursor-pointer">
              <p className="text-sm font-bold text-gray-500">
                Log in with Google
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-[110px] h-[1px] bg-gray-300"></div>
              <p className="text-sm font-medium text-gray-500">OR</p>
              <div className="w-[110px] h-[1px] bg-gray-300"></div>
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="relative">
                <input
                  type="text"
                  id="fullname"
                  value={formData.full_name}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      full_name: e.target.value,
                    }));
                  }}
                  className="block w-full pt-3 pb-1 px-3 text-gray-900 bg-transparent rounded-md border border-blue-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="fullname"
                  className={`cursor-text absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}
                >
                  Fullname
                </label>
              </div>

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

              <div className="relative">
                <input
                  type="password"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      confirm_password: e.target.value,
                    }));
                  }}
                  className="block w-full pt-3 pb-1 px-3 text-gray-900 bg-transparent rounded-md border border-blue-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="confirm_password"
                  className={`cursor-text absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2.5 left-3 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3`}
                >
                  Confirm password
                </label>
              </div>

              <p className="text-gray-500 text-xs text-center mt-2">
                People who use our service may have uploaded your contact
                information to Smartfarm.{" "}
                <span className="text-blue-500 cursor-pointer">Learn More</span>
              </p>
              <p className="text-gray-500 text-xs text-center">
                By signing up, you agree to our{" "}
                <span className="text-blue-500 cursor-pointer">Terms</span> ,{" "}
                <span className="text-blue-500 cursor-pointer">
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="text-blue-500 cursor-pointer">
                  Cookies Policy
                </span>
                .
              </p>

              <button
                onClick={signup}
                className="bg-blue-500 rounded-xl font-medium text-white p-[6px] mt-2 hover:bg-blue-600"
              >
                Sign up
              </button>

              <p className="text-red-600 text-sm">{errMessage}</p>
            </div>
          </div>
          <div className="border border-blue-300 p-4 rounded-md text-center">
            <p>
              Have an account?{" "}
              <span className="text-blue-500 font-bold cursor-pointer">
                <Link to="/login">Log in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default SignUp;
