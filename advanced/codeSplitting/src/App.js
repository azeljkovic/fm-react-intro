import { render } from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ThemeContext from "./ThemeContext.jsx";
import { lazy, StrictMode, Suspense, useState } from "react";

const Details = lazy(() => import("./Details.jsx"));
const SearchParams = lazy(() => import("./SearchParams.jsx"));

const App = () => {
  const theme = useState("red");
  return (
    <StrictMode>
      <Suspense fallback={<h2>loading, be patient...</h2>}>
        <ThemeContext.Provider value={theme}>
          <BrowserRouter>
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </Suspense>
    </StrictMode>
  );

};

render(<App />, document.getElementById("root"));
