import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the corresponding error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Example validation: Check if required fields are filled in
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
        isValid = false;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formData.email.trim() !== "" &&
      !emailRegex.test(formData.email.trim())
    ) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (
      formData.password.trim() !== "" &&
      formData.password.trim().length < 8
    ) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d+$/;
    if (
      formData.phoneNumber.trim() !== "" &&
      !phoneRegex.test(formData.phoneNumber.trim())
    ) {
      newErrors.phoneNumber = "Phone number must contain only digits";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost:8000/createUser", {
          firstName: formData.firstName,
          surname: formData.surname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        })
        .then((result) => {
          console.log(result);
          setSuccessMessage("Account created successfully");

          // Reset the form data after successful submission
          setFormData({
            firstName: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
          });
          // Clear the success message after 5 seconds
          setTimeout(() => {
            setSuccessMessage("");
          }, 1000);
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div
      className="py-40"
      style={{
        backgroundImage: "linear-gradient(115deg, #A7F442, #60E7A6)",
        height: "80vh",
      }}
    >
      <div className="container mx-auto">
        <div className="w-full max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg p-8">
          <h2 className="text-5xl mb-4 text-center text-green-500">
            Create Account
          </h2>
          <p className="mb-8 text-2xl text-center text-gray-600">
            Create your account. It’s free and only takes a minute
          </p>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={`border border-gray-400 py-3 text-2xl px-4 rounded w-full ${
                  errors.firstName && "border-red-500"
                }`}
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                className={`border border-gray-400 py-3 text-2xl px-4 rounded w-full ${
                  errors.surname && "border-red-500"
                }`}
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`border border-gray-400 py-3 text-2xl px-4 w-full rounded ${
                  errors.username && "border-red-500"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2">{errors.username}</p>
              )}
            </div>
            <div className="mt-5">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`border border-gray-400 py-3 text-2xl px-4 w-full rounded ${
                  errors.email && "border-red-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>
            <div className="mt-5">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`border border-gray-400 py-3 text-2xl px-4 w-full rounded ${
                  errors.password && "border-red-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>
            <div className="mt-5">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`border border-gray-400 py-3 text-2xl px-4 w-full rounded ${
                  errors.phoneNumber && "border-red-500"
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="text-2xl w-full bg-green-500 py-3 text-center text-white rounded"
              >
                Create Now
              </button>
            </div>
          </form>
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
