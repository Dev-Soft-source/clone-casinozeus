import React, { useState, useEffect, useContext, useRef } from "react";
import { GameSection } from "@/components/GameSection";
import { ProviderFilter } from "../components/ProviderFilter";
import { AppContext } from "@/AppContext";
import { callApi } from "@/utils/Utils";
import FaqSection from "@/components/FaqSection";

import Casino from "../assets/img/banners/casino_seccion_desktop.jpg";
import Slot from "../assets/img/banners/slots_desktop.jpg";
import Vipro from "../assets/img/banners/viproulette_desktop.jpg";

import { Layout } from "../components/Layout";

export const SectionPage = ({ address, pagename }) => {
  const [categories, setCategories] = useState([]);
  const [groupedCasinoGames, setGroupedCasinoGames] = useState([]);
  const { contextData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [ banner, setBanner ] = useState("");
  const images = [Slot, Casino, Vipro];

  useEffect(() => {
    const fetchData = async () => {
      if(pagename === "arcade")
        setBanner(images[0]);
      else if(pagename === "home")
        setBanner(images[1]);
      else
        setBanner(images[2]);
      try {
        const pageData = await getPage(pagename);
        const casinoData = await getCasinos();
        setCategories(pageData.categories || []);
        setGroupedCasinoGames(casinoData);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pagename]);

  const getPage = (page) =>
    new Promise((resolve) => {
      callApi(contextData, "GET", `/get-page?page=${page}`, (result) => {
        if (result.status === 500 || result.status === 422) resolve({});
        else resolve(result.data);
      });
    });

  const getCasinos = () =>
    new Promise((resolve) => {
      callApi(
        contextData,
        "GET",
        `/get-top-category-content?group=default_pages_${pagename}`,
        (result) => {
          if (result.status === 500 || result.status === 422) resolve({});
          else resolve(result.data);
        },
        null
      );
    });

  const Spinner = () => (
    <Layout address={address}>
      <main>
        <div className="flex items-center justify-center h-screen">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </main>
    </Layout>
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout address={address}>
      <main>
        <div className="flex justify-center items-center px-2 w-full">
          <section className="relative mt-4 w-full container rounded-2xl overflow-hidden">
            <div className="relative h-[180px] md:h-[240px] lg:h-[360px] xl:h-[360px]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={banner}
                  alt="hero"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>

        <ProviderFilter providers={categories} pagename={pagename}/>

        {groupedCasinoGames?.map((group, index) => {
          if (!group.top_content?.length) return null;

          const games = group.top_content.map((game) => ({
            id: game.id,
            title: game.name,
            image:
              game.image_local !== null
                ? contextData.cdnUrl + game.image_local
                : game.image_url,
          }));

          // 🔗 Build link for “Mostrar todo”
          const showAllLink = `/games?providerName=${encodeURIComponent(
            group.name
          )}&pageName=${encodeURIComponent(pagename)}`;

          return (
            <GameSection
              key={group.id}
              title={group.name}
              games={games}
              icon={contextData.cdnUrl + group.image_local}
              link={showAllLink}
            />
          );
        })}

          {/* <FaqSection /> */}
      </main>
    </Layout>
  );
};
