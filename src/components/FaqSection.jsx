import React, { useState } from 'react'

export default function FaqSection() {
  const [openCardId, setOpenCardId] = useState(null);

  const toggleCard = (cardId) => {
    setOpenCardId(prev => prev === cardId ? null : cardId);
  };

  const faqItems = [
    {
      id: 'card1',
      question: '¿Quién es Stake?',
      answer: (
        <>
          <p className="mb-3">
            Liderando la industria de las apuestas en línea desde 2017, Stake ofrece una amplia variedad de opciones de casino en línea y apuestas deportivas, operando globalmente en 15 idiomas diferentes. Con una plataforma confiable y segura, Stake Casino ofrece opciones de apuestas en monedas locales y criptomonedas de todo el mundo para juegos de tragamonedas en línea, Stake Originals y juegos de casino en vivo. Stake Sportsbook ofrece cuotas inmejorables en los principales eventos deportivos, incluyendo una variedad de ligas de eSports. Ofrecemos bonos y promociones de apuestas regulares y una experiencia exclusiva de Club VIP, todo con un proceso de depósito fácil de usar en nuestra plataforma con licencia.
          </p>
       
        </>
      )
    },
    {
      id: 'card2',
      question: '¿Stake tiene licencia?',
      answer: (
        <>
          <p className="mb-3">
            Stake cuenta con la licencia de las autoridades de juego de Curazao y ofrece una plataforma de apuestas segura. Stake es operado por Medium Rare N.V., licenciada por la Autoridad de Juego de Curazao con el número de licencia OGL/2024/1451/0918. Stake es un operador verificado por la Crypto Gambling Foundation con sólidas políticas contra el blanqueo de capitales. Stake promueve el juego responsable con una sólida política de autoexclusión y diversos recursos de Stake Smart.
          </p>
      
        </>
      )
    },
    {
      id: 'card3',
      question: '¿Es seguro apostar en Stake?',
      answer: (
        <>
          <p className="mb-3">
            Stake se compromete a brindar un entorno seguro a nuestra comunidad. Nos enorgullecemos de ofrecer los recursos de juego más actualizados y accesibles para una experiencia de juego más inteligente. Nuestras directrices de juego responsable, junto con nuestra calculadora de presupuesto mensual, se han desarrollado para ayudar a nuestros jugadores a establecer límites de apuestas adecuados. Al apostar con monedas locales y criptomonedas, los jugadores pueden estar seguros de que sus fondos se almacenan de forma segura gracias a nuestra función Stake Vault.
          </p>
        </>
      )
    },
    {
      id: 'card4',
      question: '¿Con qué divisas puedo apostar?',
      answer: (
        <p>
          Además de admitir monedas locales, Stake es el casino y casa de apuestas deportivas de criptomonedas líder a nivel mundial, con 20 criptomonedas disponibles, desde Bitcoin (BTC) hasta Polygon (MATIC). Descubre la lista completa de criptomonedas admitidas en Stake para más detalles.
        </p>
      )
    },
    {
      id: 'card5',
      question: '¿Qué tipos de juegos de casino puedo jugar?',
      answer: (
        <p>
          Explora nuestra amplia variedad de juegos de casino populares y disfruta de una experiencia de juego en línea justa y divertida. La plataforma de casino en línea de Stake ofrece una amplia gama de categorías de juegos, incluyendo tragamonedas, juegos de casino en vivo, Stake Originals y muchos clásicos como Blackjack, Ruleta, Póker y Baccarat, todo directamente desde tu navegador. Stake te ofrece la mejor experiencia de juego de reconocidos proveedores de iGaming como Pragmatic Play, Hacksaw Gaming, Twist Gaming y Evolution Gaming.
        </p>
      )
    },
    {
      id: 'card6',
      question: '¿En qué deportes puedo apostar?',
      answer: (
        <p>
          Desde las principales ligas de fútbol y baloncesto hasta Dota 2 y CS:GO, cubrimos todos los mercados deportivos y de eSports. Ofrecemos cuotas líderes en la industria y recursos de apuestas personalizados, incluyendo pronósticos y predicciones de expertos en nuestro blog de noticias de Stake. Puedes apostar en todos los próximos eventos deportivos importantes, realizar apuestas en vivo y ver en directo los eventos deportivos más importantes gratis en Stake Sportsbook.
        </p>
      )
    },
    {
      id: 'card7',
      question: '¿Cómo puedo ver transmisiones en vivo?',
      answer: (
        <p>
          Stake es el lugar perfecto para ver transmisiones deportivas oficiales, con una cobertura completa de los eventos deportivos más populares y los torneos más importantes, desde partidos de tenis hasta peleas de MMA. Para ver en vivo los últimos eventos deportivos, haz clic en el ícono de transmisión junto al evento en Stake Sportsbook. Para más detalles, consulta nuestra guía completa para ver tus deportes favoritos en Stake.
        </p>
      )
    },
    
  ];

  return (
    <div className="py-8 bg-[#272726] container rounded-lg w-full my-6 mx-auto">
        {/* Section Title with Icon */}
        <div className="flex items-center mb-6 mx-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-white">¿Aún tienes preguntas?</h2>
        </div>
        
        {/* FAQ Cards */}
        {faqItems.map((item) => (
          <div className="w-full mb-3" key={item.id}>
            <div
              className="bg-[#1e1f1f] rounded-lg p-4 shadow-md cursor-pointer transition-all mx-5 duration-300 hover:bg-[#373838]"
              onClick={() => toggleCard(item.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium px-5">{item.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCardId === item.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              
              {/* Expandable content */}
              {openCardId === item.id && (
                <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}
