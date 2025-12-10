import React, {useState, useEffect, useRef, useContext} from 'react';
import { GameCard } from './GameCard';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { GameModal } from './Modals/GameModal';
import { useUser } from '@/features/user/useUser';
import { PATHS } from '@/features/navigation/paths';
import { Link, useNavigate } from 'react-router-dom';
import { useGames } from '@/features/games/useGames';
import { AppContext } from '@/AppContext';
import { enqueueSnackbar } from 'notistack';

export const GameSection = ({ title, games, icon, link }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const { user, token} = useUser();
  const navigate = useNavigate();
  const { startGameSession, isGameSessionLoading } = useGames();
  const { contextData } = useContext(AppContext);
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isMobile = window.innerWidth < 640;
  const session = localStorage.getItem("session");

  const handleGameClick = (game) => {
    if(user && session){
        if (isGameSessionLoading) {
          enqueueSnackbar("¡Inicio de sesión exitoso!", {
            variant: "warning",
            autoHideDuration: 5000,
            onExited: () => {
            },
          });
          return;
        }
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
    setTimeout(() => setSelectedGame(null), 200);
  }; 

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section>
      <div className="container mx-auto px-4 mt-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <img src={icon} className='w-5 h-5'></img>
            {/* {icon && <span className="text-2xl">{icon}</span>} */}
            <h2 className="font-sans text-[20px] font-bold">{title}</h2>
          </div>

          <Link
            to={link}
            className="text-white font-bold bg-[#262626] p-1 text-[12px] px-2 rounded-lg"
          >
            Ver Más
          </Link>
        </div>

        {/* Games Grid */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`${
            isMobile
              ? "grid grid-rows-2 grid-flow-col auto-cols-[140px] gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
              : "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 xl:grid-cols-10 gap-4"
          }`}
        >
          {games.map((game) => (
            <GameCard
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