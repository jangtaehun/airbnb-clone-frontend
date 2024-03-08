import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// connfig object를 만든다. -> light, dark, system 선택하기 위해
const config:ThemeConfig = {
    // initialColorMode: "system",
    // useSystemColorMode: true

    initialColorMode: "dark",
    useSystemColorMode: false
}

// config object를 실행하는 extendTheme
const theme = extendTheme({config});

export default theme;