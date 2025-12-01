// Mock game data for the casino website

const slotImages = [
  'https://images.unsplash.com/photo-1706129867447-b4f156c46641',
  'https://images.unsplash.com/photo-1582656975064-04e9452fc60e',
  'https://images.pexels.com/photos/7594262/pexels-photo-7594262.jpeg',
  'https://images.pexels.com/photos/7594260/pexels-photo-7594260.jpeg',
  'https://images.unsplash.com/photo-1567225299676-9ebaa1d8b28f',
  'https://images.unsplash.com/photo-1632501641765-e568d28b0015',
  'https://images.unsplash.com/photo-1732998340351-b44984f30508',
  'https://images.pexels.com/photos/24643920/pexels-photo-24643920.jpeg',
  'https://images.pexels.com/photos/7594242/pexels-photo-7594242.jpeg',
  'https://images.unsplash.com/photo-1659382151328-30c3df37a69a',
  'https://images.unsplash.com/photo-1726004592905-dc5cd794bda6',
  'https://images.unsplash.com/photo-1670251400844-26c200b75a0f',
  'https://images.unsplash.com/photo-1632032858061-b321b3c1d52b',
  'https://images.pexels.com/photos/7594410/pexels-photo-7594410.jpeg',
];

const gameProviders = [
  'Pragmatic Play',
  'NetEnt',
  'Evolution',
  'Play\'n GO',
  'Microgaming',
  'Red Tiger',
  'Big Time Gaming',
  'Yggdrasil',
];

const slotNames = [
  'Shining Reels',
  'Fire Blaze',
  'Wild Cash',
  'Crystal Gold',
  'Mustang Gold',
  'Fruit Party',
  'Gates of Olympus',
  'Sweet Bonanza',
  'Mega Win',
  'Lucky Spins',
  'Diamond Rush',
  '5 Lions Dance',
  'Buffalo King',
  'Aztec Treasure',
  'Dragon Gold',
  'Pirate Gold',
  'Roulette Royale',
  'Blackjack Master',
  'Baccarat VIP',
  'Poker Deluxe',
];

const liveCasinoNames = [
  'Roulette Live',
  'Blackjack VIP',
  'Baccarat Gold',
  'Poker Master',
  'Dragon Tiger',
  'Mega Ball Live',
  'Lightning Roulette',
  'Monopoly Live',
];

const megawaysNames = [
  'Buffalo King Megaways',
  'Extra Chilli Megaways',
  'Bonanza Megaways',
  'Who Wants To Be A Millionaire',
  'Genie Jackpots Megaways',
  'Temple of Treasure Megaways',
];

// Generate games for different sections
const generateGames = (count, names, category, options = {}) => {
  return Array.from({ length: count }, (_, i) => {
    const imageIndex = i % slotImages.length;
    const nameIndex = i % names.length;
    const providerIndex = i % gameProviders.length;
    
    return {
      id: `${category}-${i + 1}`,
      title: names[nameIndex],
      image: slotImages[imageIndex],
      provider: gameProviders[providerIndex],
      category: category,
      isNew: options.includeNew && Math.random() > 0.7,
      isHot: options.includeHot && Math.random() > 0.6,
      rtp: `${(94 + Math.random() * 4).toFixed(1)}%`,
      volatility: ['Baja', 'Media', 'Alta'][Math.floor(Math.random() * 3)],
      features: [
        'Giros Gratis',
        'Multiplicadores',
        'Bonus Round',
        'Wild Symbols',
        'Scatter Symbols',
      ].slice(0, Math.floor(Math.random() * 3) + 2),
    };
  });
};

export const topSlotsGames = generateGames(18, slotNames, 'slot', { includeHot: true });
export const newGames = generateGames(18, slotNames, 'slot', { includeNew: true });
export const liveCasinoGames = generateGames(12, liveCasinoNames, 'live-casino', { includeHot: true });
export const megawaysGames = generateGames(12, megawaysNames, 'megaways', { includeNew: true });
export const recentlyPlayedGames = generateGames(18, slotNames, 'slot');

export const allGames = [
  ...topSlotsGames,
  ...newGames,
  ...liveCasinoGames,
  ...megawaysGames,
  ...recentlyPlayedGames,
];

export const providers = [...new Set(allGames.map(game => game.provider))];