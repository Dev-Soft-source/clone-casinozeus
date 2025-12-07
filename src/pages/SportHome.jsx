import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import { Layout } from "@/components/Layout";
import { useUser } from "../features/user/useUser";
import { GameDataContext } from "@/components/GameDataContext";
import { enqueueSnackbar } from "notistack";
import { PATHS } from "@/features/navigation/paths";

export function SportHome({address}) {
    const { setLoading, loading } = useContext(GameDataContext);
    const { contextData } = useContext(AppContext);
    const [sportsEmbedUrl, setSportsEmbedUrl] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const { user, token } = useUser();
    const calledRef = useRef(false);

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;
        if (!(user && token)) {
            enqueueSnackbar("Deberías iniciar sesión.", {
                variant: "error",
                autoHideDuration: 5000,
                onExited: () => {
                },
            });
            navigate(PATHS.home);
            return;
        }
        setLoading(true);
        loadSportsPage();
    }, [location.pathname]);

    const loadSportsPage = () => {
        callApi(contextData, "GET", "/get-page?page=sports", callbackGetPage, null);
    };

    const callbackGetPage = (result) => {
        if (result.status === 500 || result.status === 422) {
            setMessageCustomAlert(["error", result.message]);
        } else {
            setSportsEmbedUrl(result.data.url_embed);
            setLoading(false);
        }
    };

    const Spinner = () => (
        <Layout address={address}>
            <main>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                </div>
            </main>
        </Layout>
    );

    return (
        <Layout address={address}>
            <main>
                {loading ? (
                    <Spinner />
                ) : sportsEmbedUrl ? (
                    <div className="w-full h-screen">
                        <iframe
                            src={sportsEmbedUrl}
                            title="Sportsbook"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            onError={() =>
                                setMessageCustomAlert([
                                    "error",
                                    "No se pudo cargar el sportsbook. Intente recargar la página.",
                                ])
                            }
                        />
                    </div>
                ) : (
                    <div
                        className="game-iframe-view_gameIframeWrapper game-iframe-view_sportbook flex items-center justify-center"
                        style={{ height: "100dvh" }}
                    >
                        <div className="no-game text-center px-4">
                            <p className="text-6xl font-bold mb-4">403</p>
                            <p className="text-lg">
                                Prohibido: Acceso denegado.
                                <br />
                                Lo sentimos, su ubicación no está cubierta por nuestro servicio.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};
