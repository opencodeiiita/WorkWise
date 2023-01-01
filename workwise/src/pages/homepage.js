import React from 'react'
import '../App.css';
import Time from '../components/Time'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Date from '../components/Date';
import Weather from "../components/Weather";
import Quotes from '../components/Quotes';
import Bookmark from "../components/Bookmark";
import Image from 'rc-image';
export default function Homepage() {
  const [rendered, setRendered] = useState(false);

  const [url, setUrl] = useState(
    "https://wallpapertag.com/wallpaper/full/c/1/4/145606-best-desktop-wallpaper-1920x1200-smartphone.jpg"
  );

  const fetchBg = async () => {
    if (!rendered) {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random/?client_id=NyUvXIq3Ek5F89nIPbNAGA84yhFxG3mOiSpvOb2ZklE&query=nature&orientation=landscape"
      );
      const data = await response.data;
      setUrl(data.urls.full);
      setRendered(true);
    }
  };

  useEffect(() => {
    fetchBg();
  });

  return (
    <div
      className="image w-full h-screen bg-no-repeat bg-cover"
      // style={{ backgroundImage: `url(${url})` }}
    >
      <Image 
      className='w-full h-screen absolute'
      src={url}/>
      <div className="App">
        <div className="msg  text-bold text-white">
          <Time/>
          <Date/>
          <Weather
            cityName={"mumbai"} //This is a temporary name we can have different city names.
            apiKey={"a045d78dfc153d0c97dd1e87653d1ced"} //fill the api key here to make the widget work.
          />
          <Bookmark />
        </div>
        <Quotes />
		  </div>
    </div>
  );
}
