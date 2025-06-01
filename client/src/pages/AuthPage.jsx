import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br
		from-blue-600 to-blue-100 p-4"
    >
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8">
          {isLogin ? "Sign in to Livio" : "Create a Livio account"}
        </h2>
        <div className="bg-white shadow-xl rounded-lg p-8">
          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "New to Livio?" : "Already have an account?"}
            </p>

            <button
              onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              className="mt-2 text-blue-500 hover:text-blue-800 font-medium transition-colors duration-300"
            >
              {isLogin ? "Create a new account" : "Sign in to your account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
