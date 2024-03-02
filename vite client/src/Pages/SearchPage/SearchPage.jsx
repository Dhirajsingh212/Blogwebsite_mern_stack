import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Blog from "../../components/Blog/Blog";
import { useDispatch } from "react-redux";
import { blogActions } from "../../Store";
import HomeButton from "../../components/HomeButton/HomeButton";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && searchInput.length > 0) {
      dispatch(blogActions.resetSearchBlogs());
    }
  };

  useEffect(() => {
    dispatch(blogActions.searchBlogs({ term: searchInput }));
  }, [searchInput]);

  return (
    <div className="flex flex-col gap-4">
      <nav className="px-10 lg:px-20 max-md:px-4 py-4 bg-black lg:fixed w-full z-50 bg-transparent backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl">QuickInsight</p>
          </div>
          <div className="flex flex-row items-center md:gap-4 gap-2">
            <input
              type="text"
              placeholder="Search here."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="rounded-sm px-2 py-1 text-black w-full focus:outline-none "
            />
            <SearchBar />
            <HomeButton />
          </div>
        </div>
      </nav>
      <section className="md:py-10">
        <Blog />
      </section>
    </div>
  );
};

export default SearchPage;
