import { Box, Modal, Button, Typography } from "@mui/material";

import React, { useState } from "react";
import { Dialog, DialogContent, Slide, Stack } from "@mui/material";
import { useCommonMediaQueries } from "./../../features/common_funcs/useCommonMediaQueries"
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@/assets/img/support/whatsapp.png";
import TelegramIcon from "@/assets/img/support/telegram.png";
import EmailIcon from "@/assets/img/support/email.png";
import { enqueueSnackbar } from "notistack";

export const SupportModal = ({ address, close }) => {
    const { xxSmallScreen, mediumScreen } = useCommonMediaQueries();
    const [opened, setOpened] = useState(true);

    const pendingClose = () => {
        setOpened(false);
        if (close) {
            setTimeout(() => close(), 500);
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                enqueueSnackbar("Se ha copiado el dato al portapapeles.", {
                    variant: "success",
                    autoHideDuration: 5000,
                    onExited: () => {
                    },
                  });
            })
            .catch(() => {
                enqueueSnackbar("error.", {
                    variant: "error",
                    autoHideDuration: 5000,
                    onExited: () => {
                    },
                  });
            });
    };

    return (
        <Dialog
            open={opened}
            onClose={pendingClose}
            TransitionComponent={Transition}
            maxWidth={false}
            sx={
                xxSmallScreen
                    ? {
                        ".MuiPaper-root": {
                            margin: 0,
                            maxWidth: "95%",
                        },
                    }
                    : {}
            }
        >
            <DialogContent
                sx={{
                    background:
                        "radial-gradient(117.03% 100% at 51.3% 100%, #0f212e 0%, #0f212e 56.5%, #0f212e 100%)",
                    height: "auto",
                    minWidth: "550px",
                    padding: "30px 40px",
                    position: "relative",
                    ...(mediumScreen && {
                        minWidth: "320px",
                        padding: "20px",
                    }),
                }}
            >
                {/* Close button */}
                <CloseIcon
                    onClick={pendingClose}
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        height: 24,
                        width: 24,
                        cursor: "pointer",
                        color: "#FFFFFF",
                    }}
                />

                {/* Title */}
                <Stack alignItems="center" mt={5} mb={3}>
                    <Stack direction="row" alignItems="center" gap={2}>
                        <Box
                            sx={{
                                width: "90px",
                                height: "2px",

                                background:
                                    "linear-gradient(90deg, transparent, #6C7BAE, transparent)",
                            }}
                        />
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                                marginTop: "10px",
                                color: "#FFFFFF",
                            }}
                        >
                            ¿NECESITÁS AYUDA?
                        </Typography>
                        <Box
                            sx={{
                                width: "90px",
                                height: "2px",
                                background:
                                    "linear-gradient(90deg, transparent, #6C7BAE, transparent)",
                            }}
                        />
                    </Stack>
                </Stack>

                {/* Contact options */}
                <Stack spacing={3} mt={3}>
                    {/* WhatsApp */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box component="img" src={WhatsAppIcon} sx={{ width: 25 }} />
                            <Typography color="#FFFFFF">
                                Whatsapp: {address.support_whatsapp}
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            onClick={() => copyText(address.support_whatsapp)}
                            sx={{
                                background: "#C0C5D6",
                                color: "#000",
                                fontWeight: "bold",
                                boxShadow: "none",
                                "&:hover": { background: "#E0E3EB" },
                            }}
                        >
                            COPIAR
                        </Button>
                    </Stack>

                    {/* Telegram */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box component="img" src={TelegramIcon} sx={{ width: 25 }} />
                            <Typography color="#FFFFFF">
                                Telegram: {address.support_telegram}
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            onClick={() => copyText(address.support_telegram)}
                            sx={{
                                background: "#C0C5D6",
                                color: "#000",
                                fontWeight: "bold",
                                boxShadow: "none",
                                "&:hover": { background: "#E0E3EB" },
                            }}
                        >
                            COPIAR
                        </Button>
                    </Stack>

                    {/* Email */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Box component="img" src={EmailIcon} sx={{ width: 25 }} />
                            <Typography color="#FFFFFF">
                                Email: {address.support_email}
                            </Typography>
                        </Stack>

                        <Button
                            variant="contained"
                            onClick={() => copyText(address.support_email)}
                            sx={{
                                background: "#C0C5D6",
                                color: "#000",
                                fontWeight: "bold",
                                boxShadow: "none",
                                "&:hover": { background: "#E0E3EB" },
                            }}
                        >
                            COPIAR
                        </Button>
                    </Stack>
                </Stack>

                {/* Close button */}
                <Stack mt={5} alignItems="center">
                    <Button
                        onClick={pendingClose}
                        sx={{
                            background:
                                "linear-gradient(180deg, #FFD857 0%, #FFB300 100%)",
                            color: "#000",
                            padding: "10px 30px",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            "&:hover": {
                                background:
                                    "linear-gradient(180deg, #FFE07A 0%, #FFC933 100%)",
                            },
                        }}
                    >
                        CERRAR
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="Down" ref={ref} {...props} />;
});
