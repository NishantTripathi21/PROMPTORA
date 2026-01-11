import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px=20 xl:px-32">
      <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-1 cursor-pointer" 
      onClick={()=>{
        navigate("/")
        scrollTo(0,0)
        }}>
        <span className="text-indigo-600 font-bold">PROMPTORA</span>
      </h1>
      {user ? (
        <UserButton></UserButton>
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
        >
          Get started <ArrowRight className="w-4 h-4"></ArrowRight>
        </button>
      )}
    </div>
  );
}

export default Navbar;
