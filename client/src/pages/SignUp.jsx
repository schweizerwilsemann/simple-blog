import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value.trim() });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error("Please fill all out fields!");
      // return setErrorMessage('Please fill out all fields! ');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return toast.error(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="flex flex-col p-3 max-w-3xl mx-auto md:flex-row md:items-center gap-5">
          {/* left side */}
          <div className="flex-1">
            <Link to="/" className="font-semibold dark:text-white text-4xl">
              <span
                className="px-2 py-1 bg-gradient-to-r from-indigo-500
            via-blue-300 to bg-green-300 rounded-lg text-yellow-50"
              >
                QQ{" "}
              </span>
              博客
            </Link>
            <p className="text-sm mt-5">
              This is a demo project. You can sign up with email and password,
              or with Google
            </p>
          </div>
          {/* right side */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="">
                <Label value="Your Username" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <Label value="Your Email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <Label value="Your Password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                gradientDuoTone="tealToLime"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <OAuth></OAuth>
            </form>
            <div className="flex gap-2 text-sm mt-2">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-400">
                Sign In
              </Link>
            </div>
            <div className="flex-col">
              {errorMessage && (
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
