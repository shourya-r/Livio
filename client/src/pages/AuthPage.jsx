import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { Users, Home } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Livio
          </h1>
          <p className="text-gray-600">Find your perfect roommate match</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? "Welcome back! Sign in to continue"
                : "Join thousands of people finding roommates"}
            </p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          {/* Toggle */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 underline underline-offset-2"
              >
                {isLogin ? "Create a new account" : "Sign in to your account"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
