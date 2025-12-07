import React, { useState, useEffect, useContext, useRef } from 'react';
import { HeroSection } from '../components/HeroSection';
import { GameSection } from '@/components/GameSection';
import { ProviderFilter } from '../components/ProviderFilter';
import { AppContext } from '@/AppContext';
import { callApi } from '@/utils/Utils';

import { Layout } from '../components/Layout';

export const SectionPage = ({ address, pagename }) => {
  const calledRef = useRef(false);
  const [categories, setCategories] = useState([]);
  const [groupedCasinoGames, setGroupedCasinoGames] = useState([]);  
  const {contextData} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const fetchData = async () => {
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
      callApi(contextData, "GET", `/get-top-category-content?group=default_pages_${pagename}`,
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
    return (
        <Spinner />
    );
  }

  return (
    <Layout address={address}>
      <main>
        <HeroSection />
        
        <ProviderFilter providers={categories}/>
        
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

      </main>

    </Layout>      
  );
};