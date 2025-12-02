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

export const Layout = ({
  children,
  onSearch,
}) => {
//   const { isGameSessionLoading, isOutcomeGameLoading } = useGames();
//   const scrollContainerRef = useRef(null);
//   const { largeScreen, xxSmallScreen } = useCommonMediaQueries();
//   const [drawerOpened, setDrawerOpened] = useState(false);
//   useEffect(() => {
//     if (!pageName) return;

//     const siteName = import.meta.env.REACT_APP_SITE_NAME ?? "Casino";
//     const title = document.head.getElementsByTagName("title")[0];
//     title.innerText = pageName ? `${siteName} | ${pageName}` : siteName;

//     return () => {
//       document.title = siteName;
//     };
//   }, [pageName]);

//   const horizontalPadding = xxSmallScreen ? 1.6 : 3.2;

  return (
    // <Stack
    //   sx={{
    //     background: "rgb(5, 9, 30)",
    //     height: "100dvh",
    //   }}
    // >
    <div className="min-h-screen bg-background">
      <Header onSearch={onSearch} />
      <div className="mt-[80px]">
        <TopButtonsNav />

        <div>{children}</div>
      </div>

      <Footer />
    </div>

    //   <Box
    //     display="flex"
    //     flexGrow={1}
    //     overflow="hidden"
    //     pt={2}
    //     pl={horizontalPadding}
    //     gap={7}
    //   >
    //     <Menu opened={drawerOpened} onClose={setDrawerOpened} />

    //     <Stack
    //       ref={scrollContainerRef}
    //       flexGrow={1}
    //       pr={horizontalPadding}
    //       sx={{
    //         overflowY: "auto",
    //         scrollbarWidth: "thin",
    //         scrollbarColor: "#15181D #15181D60",
    //       }}
    //     >
    //       <Stack position="relative" minHeight={0} height="100%">
    //         {/* {!carouselDisabled && (

    //         )}             */}
    //         <Box height="fit-content">{children}</Box>

    //         {!flexGrowContentDisabled && <Box flexGrow={1} />}
    //         {!footerDisabled && (
    //           <Footer scrollContainerRef={scrollContainerRef} />
    //         )}
    //       </Stack>
    //       {(isOutcomeGameLoading || isGameSessionLoading) && <OverlaySpinner />}
    //     </Stack>
    //   </Box>

    //   {largeScreen && !mobileBottomMenuDisabled && (
    //     <BottomMenu
    //       requestSwitchDrawer={() => setDrawerOpened((prev) => !prev)}
    //     />
    //   )}
    // </Stack>
  );
};
