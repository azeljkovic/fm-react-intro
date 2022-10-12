import { render } from "react-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SearchParams from "./SearchParams.jsx";
import Details from "./Details.jsx";
import ThemeContext from "./ThemeContext.jsx";
import { StrictMode, useState } from "react";

const App = () => {
  const theme = useState("red");
  return (
    <StrictMode>
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
    </StrictMode>
  );

};

render(<App />, document.getElementById("root"));
