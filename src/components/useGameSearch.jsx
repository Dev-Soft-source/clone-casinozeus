import { useState, useEffect, useRef, useContext } from "react";
import { callApi } from "@/utils/Utils";
import { AppContext } from "@/AppContext";

export const useGameSearch = (searchRef) => {
  const [searchText, setSearchText] = useState("");
  const [foundGames, setFoundGames] = useState([]);
  const debounceTimer = useRef(null); // store timeout reference
  const { contextData } = useContext(AppContext);

  const handleSearchTextChanged = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value.length < 3) return;
    // cancel any existing debounce timer
    clearTimeout(debounceTimer.current);

    // start a new timer
    debounceTimer.current = setTimeout(() => {
      do_search(value);

    }, 500); // wait 500ms after typing stops
  };

  const do_search = (value) => {

    setFoundGames([]);

    let pageSize = 20;

    let searchDelayTimerTmp = setTimeout(function () {
      callApi(contextData, "GET",
        "/search-content?keyword=" + value + "&page_group_code=default_pages_" + "&length=" + pageSize,
        (result) => {
          if (result.status === 500 || result.status === 422) {
            return;
          } else {
            setFoundGames(result.content);
          }
        }, null
      );
    }, 1000);

  };

  // optional: cleanup timer when component unmounts
  useEffect(() => {
    return () => clearTimeout(debounceTimer.current);
  }, []);
  
  return {
    searchText,
    foundGames,
    handleSearchTextChanged,
    setSearchText,
  };
};
