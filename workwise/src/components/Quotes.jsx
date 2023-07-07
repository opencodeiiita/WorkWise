import React, { useState, useEffect } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import isMobile from "../utils/isMobile";

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
        `https://api.quotable.io/random?maxLength=${isMobile ? "40" : "60"}`
      );
      const { content: quote, author } = res.data;

      setQuoteText(quote + (isMobile ? "" : " - " + author));
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
    <div className="quote__container relative flex flex-col justify-center items-center py-3 sm:py-2 px-7 sm:px-4 min-w-4xl sm:w-65">
      {loading ? (
        <Oval
          height={isMobile ? 25 : 40}
          width={isMobile ? 25 : 40}
          color="black"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          <div className="quote__bg absolute w-[50vw] h-full z-10 opacity-75 rounded-xl " />
          <div
            className={`quote__text z-20 py-2 text-[#FFFFFF] text-center sm:text-lg font-medium italic ${
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
