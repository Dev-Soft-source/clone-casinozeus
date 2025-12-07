import React, {useState, useRef, useEffect, useContext} from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import GameLunchPage from './pages/GameLaunchPage';
import { SearchPage } from "./pages/SearchPage";
import { SectionPage } from "./pages/SectionPage";
import { SportHome } from "./pages/SportHome";
import { SubPage } from "./pages/SubPage";
import { ProviderGamePage } from "./pages/ProviderGamePage";
import { AppContext } from "./AppContext";
import { callApi } from "./utils/Utils";
import { PATHS } from "./features/navigation/paths";
import "./App.css";

function App() {
  const { contextData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const calledRef = useRef(false);
  const [address, setAddress] = useState({
    support_whatsapp: "",
    support_telegram: "",
    support_email: "",
  });

  const getPage = (page) => {
    callApi( contextData, "GET", "/get-page?page=" + page, callbackGetPage, null );
  };

  const getCategories = () => {
    callApi(contextData, "GET", "/get-status", callbackGetCategories, null);
  };

  const callbackGetCategories = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      const fetch_address = {
        support_whatsapp: result.support_whatsapp,
        support_telegram: result.support_telegram,
        support_email: result.support_email,
      };
      setAddress(fetch_address);
    }
  };

  const callbackGetPage = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      setCategories(result.data.categories);
    }
  };

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    getCategories();
    getPage("home");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path={PATHS.home} element={<HomePage categories={categories} address={address}/>} />
        <Route path={PATHS.launchGame} element={<GameLunchPage />}/>
        <Route path={PATHS.jokers} element={<SubPage categories={categories} address={address} pagename="joker"/>}/>
        <Route path={PATHS.hot} element={<SubPage categories={categories} address={address} pagename="hot"/>}/>
        <Route path={PATHS.megaways} element={<SubPage categories={categories} address={address} pagename="megaways"/>}/>
        <Route path={PATHS.ruletas} element={<SubPage categories={categories} address={address} pagename="roulette"/>}/>
        <Route path={PATHS.search} element={<SearchPage categories={categories} address={address}/>}/>
        <Route path={PATHS.casino} element={<SectionPage address={address} pagename="home"/>}/>
        <Route path={PATHS.liveCasino} element={<SectionPage address={address} pagename="livecasino"/>}/>
        <Route path={PATHS.crash} element={<SectionPage address={address} pagename="arcade"/>}/> 
        <Route path={PATHS.sport} element={<SportHome address={address}/>}/>
        <Route path={PATHS.games} element={<ProviderGamePage address={address} />}/>
      </Routes>
    </div>
  );
}

export default App;
