import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz-logo" className="'w-28 object-contain" />
        <button
          type="button"
          onClick={() => {
            window.open("https");
          }}
          className="black_btn">
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summrize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAl GPT-4</span>
      </h1>
      <h2 className="desc w-full justify-center text-gray-800">
      It's important to note that this is a speculative description based on the capabilities of previous GPT models. If GPT-4 or a similar model with such features has been released since my last update, you may want to check the official documentation or release notes for accurate information.
      </h2>
      <h5 className="m-5 scale-y-90 mt-8 font-satoshi text-lg">Past URL Below</h5>
      
    </header>
  );
};

export default Hero;
