import React, { useState, useEffect, useContext, useRef } from "react";
import { GameDataContext } from "@/components/GameDataContext";
import { SubgameSection } from "@/components/SubgameSection";
import { AppContext } from "@/AppContext";
import { callApi } from "@/utils/Utils";
import { enqueueSnackbar } from "notistack";
import { Layout } from "@/components/Layout";
import { ProviderFilter } from "@/components/ProviderFilter";

export const SubPage = ({ categories, address, pagename }) => {
    const { setLoading, loading } = useContext(GameDataContext);
    const { contextData } = useContext(AppContext);
    const [games, setGames] = useState([]);
    const calledRef = useRef(false);
    const changeName = {"joker": "Jokers", "hot": "Callente", "megaways": "Megaways", "roulette": "Ruletas"}

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;
        setLoading(true);
        const fetchData = async () => {
            try {
                const pageData = await getPage();

                setGames(pageData.categories || []);
            } catch (err) {
                enqueueSnackbar("Error al cargar datos", {
                    variant: "error",
                    autoHideDuration: 5000,
                    onExited: () => {
                    },
                });
            } finally {
                setLoading(false);
                calledRef.current = false;
            }
        };
        fetchData();
        
    }, [pagename]);

    const getPage = () =>
        new Promise((resolve) => {
            callApi(contextData, "GET", `/get-page?page=${pagename}`, (result) => {
                if (result.status === 500 || result.status === 422) resolve({});
                else resolve(result.data);
            });
        });    
    
    return (
        <Layout address={address}>
            <main>
                <ProviderFilter providers={categories} />

                {games.length > 0 && (
                    <SubgameSection
                        title={changeName[pagename]}
                        games={games}
                        loading={loading}
                    />
                )}
            </main>
        </Layout>
    );
};
