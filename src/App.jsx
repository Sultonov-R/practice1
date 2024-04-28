import React, { useEffect, useState } from "react";
import "./App.css";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [storedItemIds, setStoredItemIds] = useState([]);

  async function getData(limit, page) {
    try {
      const resp = await fetch(
        `http://localhost:3000/countries?limit=${limit}&page=${page}`
      );
      const data = await resp.json();
      setCountries([...countries, ...data.results]);
      setFetching(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (fetching) {
      getData(15, currentPage);
    }
  }, [fetching, currentPage]);

  useEffect(() => {
    getData(15, currentPage);
  }, []);

  function ScrollHandler() {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", ScrollHandler);
    return function () {
      document.removeEventListener("scroll", ScrollHandler);
    };
  }, []);

  function handleClick(id) {
    
    const item = countries.find((item) => item.id == id);

    let info = JSON.parse(localStorage.getItem("data")) || [];

    let localIndex = info.findIndex((el) => el.id == item.id);

    if (localIndex !== -1) {
      info.splice(localIndex, 1);
    } else {
      info.push(item);
    }
    setStoredItemIds(info.map(item => item.id));
    localStorage.setItem("data", JSON.stringify(info));
  }

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("data")) || [];
    const storedItemIds = storedItems.map((item) => item.id);
    setStoredItemIds(storedItemIds);
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        {countries.length > 0 &&
          countries.map((country, index) => {
            return (
              <Country
                key={index}
                title={country.country}
                image={country.flag}
                code={country.code}
                click={() => handleClick(country.id)}
                active={storedItemIds.includes(country.id)}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
