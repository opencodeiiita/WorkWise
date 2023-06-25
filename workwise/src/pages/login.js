import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleButton from "react-google-button";
import { UserContext } from "../utils/contexts/User";
import { useContext } from "react";
import { Alert } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const {baseUrl} = useContext(UserContext);

  const redirectToGoogleSSO = () => {
    const url = `${baseUrl}/auth/login/google`;
    const newWindow = window.open(
      url,
      "_self"
    );
  };

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <GoogleButton onClick={redirectToGoogleSSO} />

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
