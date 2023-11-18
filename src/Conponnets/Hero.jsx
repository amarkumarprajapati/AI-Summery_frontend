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
      <h2 className="desc">
        any the are right now
      </h2>
    </header>
  );
};

export default Hero;
