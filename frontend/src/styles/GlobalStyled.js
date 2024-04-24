import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"
export const GlobalStyles = createGlobalStyle`
    ${reset}
    
    @font-face {
        font-family: 'Roboto';
        src: url('../fonts/Roboto-Thin.tff') format('truetype');
        font-weight: 100;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('../fonts/Roboto-Light.tff') format('truetype');
        font-weight: 300;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('../fonts/Roboto-Regular.tff') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('../fonts/Roboto-Medium.tff') format('truetype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('../fonts/Roboto-Bold.tff') format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('../fonts/Roboto-Black.tff') format('truetype');
        font-weight: 900;
        font-style: normal;
    }


    * {
        box-sizing: border-box;
        outline: 0;
        caret-color: transparent;
    }

    html, body {
        font-family: 'Roboto', sans-serif;
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

    button {
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        line-height: normal;
        overflow: visible;
        font-weight: 400;
        color: rgb(234, 240, 236);
    }
`

export default GlobalStyles