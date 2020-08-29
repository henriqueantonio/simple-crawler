import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }
  
  body {
    background: #282c30;
    color: black;
    -webkit-font-smoothing: antialiased;
    ::-webkit-scrollbar {
    display: none;
  }
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  

  button {
    cursor: pointer;
  }
`;
