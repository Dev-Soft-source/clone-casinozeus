import { useEffect, useRef, useState } from "react";
// import { Box, Stack } from "@mui/material";
// import { OverlaySpinner } from "../components/OverlaySpinner";
// import { useGames } from "../features/games/useGames";
// import { useCommonMediaQueries } from "../features/common_funcs/useCommonMediaQueries";
// import { Menu } from "./menu/Menu";
import { Header } from "./Header";
// import { BottomMenu } from "./menu/BottomMenu";
import { Footer } from "./Footer";
import { TopButtonsNav } from "./TopButtonsNav";
import { useCommonMediaQueries } from "../features/common_funcs/useCommonMediaQueries";

export const Layout = ({ children, onSearch }) => {


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mt-[80px]">
        <TopButtonsNav />

        <div>{children}</div>
      </div>

      <Footer />
    </div>
  );
};
