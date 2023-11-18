import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../Services/article";
import { animate, motion } from "framer-motion";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem("article"));
    if (articleFromLocalStorage) {
      setAllArticles(articleFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const existingArticle = allArticles.find((item) => item.url === article.url);
  
    if (existingArticle) return setArticle(existingArticle);
  
    const { data } = await getSummary({
      articleUrl: article.url,
    });
  
    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };
      const updatedAllarticle = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllarticle);
      localStorage.setItem("article", JSON.stringify(updatedAllarticle));
  
      // Smooth scroll to the summary section
      const summarySection = document.getElementById("summary-section");
      if (summarySection) {
        summarySection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  

  // Copy Button

  const [copy, setCopy] = useState(false);

  // ...

  const copybutton = (copyUrl) => {
    setCopy(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  // onclick button

  var scrollDown = () => {
    window.scrollBy({
      button: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-5 w-full max-w-xl">
      <div className="flex flex-col w-full gap-0">
        <form
          onSubmit={handleSubmit}
          onFocus={scrollDown}
          className="relative flex justify-center items-center">
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-3
          ml-3 w-5"
          />
          <input
            value={article.url}
            placeholder="Enter a URL"
            type="text"
            name=""
            id=""
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            onKeyDown={handleKeyDown}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700
          peer-focus:text-gray-700
          ">
            <p>↵</p>
          </button>
        </form>
        {/* history url */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              onFocus={scrollDown}
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card">
              <div className="copy_btn" onClick={() => copybutton(item.url)}>
                <img
                  src={copy === item.url ? tick : copy}
                  alt={copy === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                  {item.url}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* diplay */}
      <div id="summary-section" className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            onFocus={scrollDown}
            src={loader}
            alt="loader_icon"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <motion.p
            onFocus={scrollDown}
            initial={{ y: 0 }}
            animate={{ y: 100 }}
            className="font-inter text-lg text-black text-center mb-10">
            Something Went Wrong.... We are Working on it
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
            <motion.img 
            onChange={scrollDown}
            animate={{x : 0}}
            transition={{y : 100}}
            
            src="sorry.png" alt="image" />
          </motion.p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
