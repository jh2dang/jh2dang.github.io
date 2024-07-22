import GlobalStyle from "./GlobalStyle.ts";
import ReactDOM from "react-dom/client";
import App from "./navigations/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
