import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const Quotes = () => {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [quoteText, setQuoteText] = useState("");

  const fetchQuote = async () => {
    try {
      // start loading
      setLoading(true);
      // fetching the quote from API
      const res = await axios.get(
        "https://api.quotable.io/random?maxLength=60"
      );
      const { content: quote, author } = res.data;
      setQuoteText(quote + " - " + author);
      setIsFadingOut(false);
      // stop loading
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fadeOut = (cb) => {
    setIsFadingOut(true);
    cb();
  };

  useEffect(() => {
    fetchQuote();
    const fiveMins = 300000;
    const quoteIntervalId = setInterval(() => fadeOut(fetchQuote), fiveMins);
    return () => {
      clearInterval(quoteIntervalId);
    };
  }, []);

  return (
    <div className="quote__container relative flex flex-col justify-center items-center py-3 px-7 min-w-4xl">
      {loading ? (
        <Oval
          height={40}
          width={40}
          color="black"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          <div className="quote__bg absolute w-full h-full bg-white z-10 opacity-80 rounded-xl " />
          <div
            className={`quote__text z-20 text-black text-center text-2xl font-light ${
              isFadingOut ? "quote__text--fadeout" : "quote__text"
            }`}
          >
            {quoteText}
          </div>
        </>
      )}
    </div>
  );
};

export default Quotes;
