import {useState, useContext, useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MediaqueryIndicator } from "./components/MediaqueryIndicator";
import HomePage from "./pages/Home";
import LobbyPage from "./pages/Lobby";
import Casino from "./pages/Casino";
import Sports from "./pages/Sports";
import { GameLaunchPageRD } from './pages/GameLaunchPage';
import { GamesPage } from "./pages/GamesPage";
import NoPage from "./pages/NoPage";
import { AppContext } from "./AppContext";
import { callApi } from "./utils/Utils";
import { PATHS } from './features/navigation/paths';

import { PersonalAreaPage } from './pages/personalArea/PersonalAreaPage';
import { UserInfoPage } from './pages/personalArea/UserInfo';
import { TransactionsPage } from './pages/personalArea/Transactions';
import { GamesHistoryPage } from './pages/personalArea/GameHistory';
import { LegendsPage} from './pages/LegendsPage';
import { BecomeAnAgentPage } from './pages/siteInfo/becomeAnAgent/BecomeAnAgentPage';
import { AboutUsPage } from './pages/siteInfo/aboutUs/AboutUsPage';
import { SearchResultPage } from './pages/SearchResultPage';

export default function AppRoutes() {

    const { contextData } = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [liveCategories, setLiveCategories] = useState([]);
    const [crashCategories, setCrashCategories] = useState([]);
    const [topGames, setTopGames] = useState([]);
    const [topLiveCasino, setTopLiveCasino] = useState([]);
    const [topCrashGames, setTopCrashGames] = useState([]);
    const [groupedCasinoGames, setGroupedCasinoGames] = useState([]);
    const [groupedLiveCasinoGames, setGroupedLiveCasinoGames] = useState([]);
    const [groupedCrashGames, setGroupedCrashGames] = useState([]);
    const [address, setAddress] = useState({
        support_whatsapp: "",
        support_telegram: "",
        support_email: "",
    });

    const getPage = (page) => {
        callApi(contextData, "GET", "/get-page?page=" + page, callbackGetPage, null);
    };

    const getCategories = () => {
        callApi(contextData, "GET", "/get-status", callbackGetCategories, null);
    };   

    const getLiveCategories = () => {
        callApi(contextData, "GET", "/get-page?page=livecasino", (result) => {setLiveCategories(result.data.categories)}, null);
    };

    const getCrashCategories = () => {
        callApi(contextData, "GET", "/get-page?page=arcade", (result) => {setCrashCategories(result.data.categories)}, null);
    };

    const callbackGetCategories = (result) => {
        if (result.status === 500 || result.status === 422) {
            setMessageCustomAlert(["error", result.message]);
        } else {
            const fetch_address = {
                support_whatsapp: result.support_whatsapp,
                support_telegram: result.support_telegram,
                support_email: result.support_email,
            }
            setAddress(fetch_address);
            setTopGames(result.top_slot);
            setTopLiveCasino(result.top_livecasino);
            setTopCrashGames(result.top_arcade);
        }
    };

    const callbackGetPage = (result) => {
        if (result.status === 500 || result.status === 422) {
            setMessageCustomAlert(["error", result.message]);
        } else {
            setCategories(result.data.categories);
        }
    };

    const callbackGetCasino = (result) => {
        if (result.status === 500 || result.status === 422) {
            setMessageCustomAlert(["error", result.message]);
        } else {
            setGroupedCasinoGames(result.data);
        }
    }; // no new reference every render

    const getCasino = () => {
        callApi(
            contextData,
            "GET",
            `/get-top-category-content?group=default_pages_home`,
            callbackGetCasino,
            null
        );
    };

    const callbackGetLiveCasino = (result) => {
        if (result.status === 500 || result.status === 422) {
            setMessageCustomAlert(["error", result.message]);
        } else {
            setGroupedLiveCasinoGames(result.data);
        }
    };
    const getLiveCasino = () => {
        callApi(
            contextData,
            "GET",
            `/get-top-category-content?group=default_pages_livecasino`,
            callbackGetLiveCasino,
            null
        );
    };

    const callbackGetCrash = (result) => {
        if (result.status === 500 || result.status === 422) {
            setMessageCustomAlert(["error", result.message]);
        } else {
            setGroupedCrashGames(result.data);
        }
    };

    const getCrash = () => {
        callApi(
            contextData,
            "GET",
            `/get-top-category-content?group=default_pages_arcade`,
            callbackGetCrash,
            null
        );
    };
    
    useEffect(() => {
        getCategories();
        getLiveCategories();
        getCrashCategories();
        getPage("home");        
        getCasino();
        getLiveCasino();
        getCrash();
    }, []);

    return (
        <>
            <MediaqueryIndicator position={'top-left'} />
            <Routes>
                <Route path={PATHS.home} element={<HomePage topGames={topGames} topLiveCasino={topLiveCasino}  topCrashGames={topCrashGames} categories={categories} contextData={contextData} address={address} pageName={"top"}/> } />
                <Route path={PATHS.lobby} element={<LobbyPage topGames={topGames} categories={categories} contextData={contextData} pageName={"lobby"} />}/>
                <Route path={PATHS.casino} element={<Casino groupedGames={groupedCasinoGames} categories={categories} contextData={contextData} pageName={"casino"}/>} />
                <Route path={PATHS.liveCasino} element={<Casino groupedGames={groupedLiveCasinoGames} categories={categories} contextData={contextData} pageName={"live_casino"}/>} />
                <Route path={PATHS.crash} element={<Casino groupedGames={groupedCrashGames} categories={categories} contextData={contextData} pageName={"crash"}/>}/>
                <Route path={PATHS.sport} element={<Sports />} />
                <Route path={PATHS.launchGame} element={<GameLaunchPageRD categories={categories} contextData={contextData} />} />
                <Route path={PATHS.games} element={<GamesPage liveCategories={liveCategories} crashCategories={crashCategories} categories={categories} contextData={contextData}/>} />
                <Route path={PATHS.tableGames} element={<GamesPage categories={categories} contextData={contextData}/>} />
                <Route path={PATHS.becomeAnAgent} element={<BecomeAnAgentPage />} />
                <Route path={PATHS.searchResults} element={<SearchResultPage categories={categories} contextData={contextData}/>} />
                <Route path={PATHS.legends} element={<LegendsPage />} />
                <Route path={PATHS.aboutUs} element={<AboutUsPage />} />

                <Route path={PATHS.dashboard} element={<PersonalAreaPage />} >
                    <Route index element={<Navigate to={PATHS.userInfo} />} />
                    <Route path={PATHS.userInfo} element={<UserInfoPage />} />
                    <Route path={PATHS.gameHistory} element={<GamesHistoryPage />} />
                    <Route path={PATHS.transactions} element={<TransactionsPage />} />
                </Route>
                
                <Route path="*" element={<NoPage />} />
            </Routes>
        </>

    );
}