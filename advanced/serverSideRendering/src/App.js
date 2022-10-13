import { Link, Route, Routes } from "react-router-dom";
import SearchParams from "./SearchParams.jsx";
import Details from "./Details.jsx";
import ThemeContext from "./ThemeContext.jsx";
import { StrictMode, useState } from "react";

const App = () => {
  const theme = useState("red");
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </ThemeContext.Provider>
    </StrictMode>
  );

};


export default App;
