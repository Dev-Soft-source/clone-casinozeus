import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopButtonsNav } from "./TopButtonsNav";
import { BottomMenuItem } from "./BottomMenuItem";
import { PATHS } from "@/features/navigation/paths";

import MenuImage from "@/assets/img/bottomCasino.png";

// Import SVGs as React Components
import { ReactComponent as Casino } from "@/assets/custom-icons/misc/slots.desactivado.svg";
import { ReactComponent as LiveCasino } from "@/assets/custom-icons/misc/casino.desactivado.svg";
import { ReactComponent as Sport } from "@/assets/custom-icons/misc/deportes.desactivado.svg";

// PNG stays as a normal image
import CrashIcon from "@/assets/custom-icons/jackpot.png";

export const Layout = ({ children, address }) => {
  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">
      {/* HEADER */}
      <Header address={address} />

      {/* CONTENT AREA WITH TOP NAV + PADDING FOR FIXED BOTTOM BAR */}
      <div className="mt-[80px] flex-1">
        <TopButtonsNav />
        <div>{children}</div>
      </div>
      {/* FOOTER */}
      <Footer />

      {/* ────────────────────────────────────────────── */}
      {/* BOTTOM MENU (MOBILE ONLY) */}
      {/* ────────────────────────────────────────────── */}
      <div className="
        lg:hidden xl:hidden
        fixed bottom-0 left-0 right-0
        h-[80px]
        bg-[#262626]
        z-[99999]
        border-t
        flex flex-nowrap
      ">
        {/* SPORT */}
        <BottomMenuItem
          link={PATHS.casino}
          title="Casino"
          className="w-[20%]"
          icon={() => <Casino />}
        />

        {/* LOBBY */}
        <BottomMenuItem
          link={PATHS.liveCasino}
          title="Casino en Vivo"
          className="w-[20%]"
          icon={() => <LiveCasino />}
        />

        {/* CENTER DIAMOND / HOME */}
        <div className="relative w-[20%] flex items-center justify-center">
          <div className="absolute -top-6 rotate-45 w-[50px] h-[60px] pointer-events-none flex items-center justify-center">
            <img src={MenuImage} className="w-[60px] h-[50px] -rotate-45" />
          </div>
          <p className="text-[10px] pt-[18px]">Inicio</p>
        </div>

        {/* LEGENDS */}
        <BottomMenuItem
          link={PATHS.crash}
          title="Crash"
          className="w-[20%]"
          icon={() => (
            <img
              src={CrashIcon}
              alt="Legends"
              className="w-[28px] h-[28px]"
            />
          )}
        />

        {/* MENU */}
        <BottomMenuItem
          link={PATHS.sport}
          title="Deportes"
          className="w-[20%]"
          icon={() => <Sport />}
        />
      </div>
    </div>
  );
};
