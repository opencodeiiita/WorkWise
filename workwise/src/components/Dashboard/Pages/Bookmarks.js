import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../utils/contexts/User.js";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { baseUrl } = useContext(UserContext);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/bookmarks`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        setBookmarks(response.data.bookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const deleteBookmark = async (bookmarkId) => {
	try {
	  await axios.delete(
		`${baseUrl}/bookmarks/${bookmarkId}`,
		{
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
		  },
		}
	  );
  
	  setBookmarks((prevBookmarks) =>
		prevBookmarks.filter((bookmark) => bookmark._id !== bookmarkId)
	  );
	} catch (error) {
	  console.error("Error deleting bookmark:", error);
	}
  };
  

  const truncateURL = (url, maxLength) => {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + "...";
    }
    return url;
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        All User's Bookmarks
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-200 dark:bg-gray-800 sm:grid-cols-4">
          <div className="py-2.5 text-center">
            <h5 className="text-sm font-medium uppercase">Source</h5>
          </div>
          <div className="py-2.5 text-center">
            <h5 className="text-sm font-medium uppercase">NAME</h5>
          </div>
          <div className="py-2.5 text-center">
            <h5 className="text-sm font-medium uppercase">BOOKMARK URL</h5>
          </div>
          <div className="py-2.5 text-center">
            <h5 className="text-sm font-medium uppercase">Actions</h5>
          </div>
          
        </div>

        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="grid grid-cols-4 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
          >
            <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img
                  src={bookmark.imageUrl}
                  alt="Brand"
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{bookmark.name}</p>
            </div>
            <div className="flex  items-center justify-center p-2.5 xl:p-5 overflow-hidden">
              <a
                href={bookmark.url}
				target="_blank"
				rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate"
              >
               {bookmark.url}
              </a>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                onClick={() => deleteBookmark(bookmark._id)}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
