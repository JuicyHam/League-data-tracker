import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"
import NotoSans from "../fonts/NotoSans-VariableFont_wdth,wght.ttf"
export const GlobalStyles = createGlobalStyle`
    ${reset}
    
    @font-face {
        font-family: 'Noto Sans';
        src: url(${NotoSans}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
        outline: 0;
    }

    html, body {
        font-family:  'Noto Sans', sans-serif;
        font-weight: 400;
        font-size: 14px;
    }

    body {
        background-color: ${props => props.theme.default_background_color};
        color: ${props => props.theme.default_font_color};
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`

export default GlobalStyles