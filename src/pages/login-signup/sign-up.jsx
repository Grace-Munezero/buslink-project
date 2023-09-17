import React, { useState, useEffect } from "react";
import "./sign-up.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const initialValues = { userName: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.userName) {
      errors.userName = "UserName is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(
    (e) => {
      console.log("formValues:", formValues);
      console.log("formErrors:", formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        if (formValues.password != ConfirmPassword) {
          toast("password are not marching");
        } else {
          sendDataToBackend();
        }
      }
    },
    [formErrors]
  );

  const sendDataToBackend = async () => {
    try {
      const response = await fetch(
        "https://better-bikini-tick.cyclic.cloud/api/v2/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      alert("succefull signup");

      navigate("/login");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data:");
    }
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="login-signup-center">
      <div className="container-signup" id="signup-fix-error">
        <div className="forms-container">
          <div className="form-control signup-form">
            <form action="#" onSubmit={handleSubmit}>
              <h2>Create Account</h2>
              <input
                type="text"
                placeholder="UserName"
                required
                name="userName"
                value={formValues.userName}
                onChange={handleChange}
              />
              {formErrors.userName && <p>{formErrors.userName}</p>}
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && <p>{formErrors.email}</p>}
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && <p>{formErrors.password}</p>}
              <input
                type="password"
                placeholder="Confirm password"
                required
                name="Confirmpassword"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit">Signup</button>
            </form>
            <span>or signup with</span>
            <div className="socials">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-google-plus-g"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
        </div>
        <div className="intros-container">
          {/* <pre>{JSON.stringify(formValues,undefined,2)}</pre> */}
          <div className="intro-control signup-intro">
            <div className="intro-control__inner">
              <h2>Welcome Back!</h2>
              <p>
                We are so excited to have you here. If you haven't already,
                create an account to get access to exclusive offers, rewards,
                and discounts.
              </p>
              <button id="signin-btn" onClick={handleSignIn}>
                <a href=""> Sign in.</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
