import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Blog from "../../components/Blog/Blog";
import { useDispatch } from "react-redux";
import { blogActions } from "../../Store";
import HomeButton from "../../components/HomeButton/HomeButton";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogActions.searchBlogs({ term: searchInput }));
  }, [searchInput]);

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <nav className="px-10 lg:px-20 max-md:px-4 py-4 bg-black lg:fixed w-full z-50 bg-transparent backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl">QuickInsight</p>
          </div>
          <div className="flex flex-row items-center md:gap-4 gap-2">
            <input
              type="text"
              placeholder="Search here."
              className="input input-bordered w-full max-w-xs"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <SearchBar />
            <HomeButton />
          </div>
        </div>
      </nav>
      <section className="md:py-20">
        <Blog />
      </section>
    </div>
  );
};

export default SearchPage;
