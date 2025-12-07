import React, {useState, useContext} from 'react';
import { SubgameCard } from './SubgameCard';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { GameModal } from './Modals/GameModal';
import { useUser } from '@/features/user/useUser';
import { PATHS } from '@/features/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { useGames } from '@/features/games/useGames';
import { AppContext } from '@/AppContext';


export const SubgameSection = ({ title, games, loading }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const { user, token} = useUser();
  const navigate = useNavigate();
  const { startGameSession } = useGames();
  const { contextData } = useContext(AppContext);

  const session = localStorage.getItem("session");
//   if (!contextData.session) {
//     console.log("sldkfjsldjfsdlfkjsdlf");
//     localStorage.removeItem("Casinozeus_user");
//     localStorage.removeItem("Casinozeus_token");
//     navigate(PATHS.home);
//   }

  const handleGameClick = (game) => {
    if(user && session){
        startGameSession(game.id);
        navigate(`${PATHS.launchGame}?internalId=${game.id}`);
    }else if(user && !session){
        window.location.reload();
    }else{
        setSelectedGame(game);
        setIsGameModalOpen(true);
    }    
  };

  const handleCloseModal = () => {
    console.log(isGameModalOpen)
    setIsGameModalOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  }; 

  const Spinner = () => (
    <div className="flex items-center justify-center">
        <div className="w-7 h-7 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin"></div>
    </div>
    );

  return (
    <section>
      <div className="container mx-auto px-4 mt-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            {/* {icon && <span className="text-2xl">{icon}</span>} */}
            <h2 className="font-sans text-[30px] font-bold">{title}</h2>
            {loading && <Spinner />}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10 gap-4">
          {games.map((game) => (
            <SubgameCard
             key={game.id} 
             game={game} 
             onClick={handleGameClick} />
          ))}
        </div>
      </div>

      <GameModal
        game={selectedGame}
        open={isGameModalOpen}
        onOpenChange={handleCloseModal}
      />
    </section>    
  );
};