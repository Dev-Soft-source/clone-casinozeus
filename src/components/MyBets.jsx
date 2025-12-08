import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '@/AppContext';

export default function MyBets({ betsData }) {
  const { contextData } = useContext(AppContext);
  const [serverTime, setServerTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const calledRef = useRef(false);

  // ✅ Fetch server time from response headers
  const getServerTime = async () => {
    try {
      const response = await fetch(window.location.origin, { method: 'HEAD' });
      const serverDate = response.headers.get('date');

      if (!serverDate) throw new Error('Server did not return a Date header');

      return new Date(serverDate).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      console.error('Error fetching server time:', error);
      return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  };
  
  // ✅ Update server time periodically
  const fetchServerTime = async () => {
    const time = await getServerTime();
    setServerTime(time);
    setIsLoading(false);
  };

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    fetchServerTime();
    const interval = setInterval(fetchServerTime, 60000); // update every 60s
    return () => clearInterval(interval);
  }, []);

  // ✅ Handle undefined or empty betsData safely
  const hasBets = Array.isArray(betsData) && betsData.length > 0;

  return (
    <div className="p-0 sm:p-0">
      <div className="rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 px-4 border-b font-semibold text-sm"
          style={{
            backgroundColor: 'var(--grey-600)',
            borderBottomColor: 'var(--grey-500)',
            color: 'var(--grey-200)',
          }}
        >
          <div className="text-[16px]">Game</div>
          <div className="hidden sm:block text-center text-[16px]">User</div>
          <div className="hidden lg:block text-center text-[16px]">Time</div>
          <div className="text-right pr-1 text-[16px]">Payout</div>
        </div>

        {/* Bets List */}
        <div className="overflow-hidden min-h-[200px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[200px] text-gray-400">
              Loading bets...
            </div>
          ) : hasBets ? (
            betsData.map((bet, index) => {
              const imageDataSrc = contextData?.cdnUrl + bet.image_local;
              const isCardRow = (index + 1) % 2 === 0;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 px-4 py-1 transition-all duration-300 ease-in-out ${
                    isCardRow ? 'rounded-lg my-2 bg-[#1e1f1f]' : 'my-2'
                  }`}
                >
                  {/* Game */}
                  <div className="flex items-center gap-2">
                    <img
                      src={imageDataSrc}
                      alt={bet.name}
                      className="w-[55px] h-[70px] object-cover rounded-[8px]"
                    />
                    <span className="text-[16px]" style={{ color: 'var(--grey-200)' }}>
                      {bet.name}
                    </span>
                  </div>

                  {/* User */}
                  <div
                    className="hidden sm:flex items-center justify-center text-[16px]"
                    style={{ color: 'var(--grey-200)' }}
                  >
                    {bet.username}
                  </div>

                  {/* Time */}
                  <div
                    className="hidden lg:flex items-center justify-center text-[16px]"
                    style={{ color: 'var(--grey-200)' }}
                  >
                    {serverTime}
                  </div>

                  {/* Payout */}
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[16px] font-semibold text-[#1DFF21]">
                      ${' '}{bet.value}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 py-6">
              No bets available
            </div>
          )}
        </div>

        {/* Mobile Info */}
        <div
          className="sm:hidden p-4 text-center border-t"
          style={{ borderTopColor: 'var(--grey-500)' }}
        >
          <p className="text-xs" style={{ color: 'var(--grey-400)' }}>
            Tap any row for full details
          </p>
        </div>
      </div>
    </div>
  );
}
