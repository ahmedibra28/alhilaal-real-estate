"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa6";

const Navigation = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: window.location.href });
    setLoading(false);
  };

  const btn = () => {
    if (session && session.user) {
      return (
        <>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  height={40}
                  width={40}
                  src={session.user.image!}
                  alt={session.user.name!}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">{session.user.name}</a>
              </li>
              <li>
                <button onClick={() => signOut()} type="button">
                  <a>Logout</a>
                </button>
              </li>
            </ul>
          </div>
        </>
      );
    } else if (loading) {
      return (
        <button className="btn">
          Loading...
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      );
    } else {
      return (
        <button
          disabled={loading}
          onClick={handleSignInWithGoogle}
          className={`btn ${loading ? "btn-disabled opacity-50" : "d"}`}
        >
          Sign in with <FaGoogle />
        </button>
      );
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">
          Alhilaal Real Estate
        </a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>

      <div className="navbar-end">{btn()}</div>
    </div>
  );
};

export default Navigation;
