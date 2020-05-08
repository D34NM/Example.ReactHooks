import React, { useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Search from "./Search";
import Hero from "./Hero";

const initialState = {
  heroes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_HEROES_REQUEST":
      return {
        ...state,
      };
    case "SEARCH_HEROES_SUCCESS":
      return {
        ...state,
        heroes: action.payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_HEROES_REQUEST",
    });

    fetch("http://localhost:80/heros")
      .then((response) => response.json())
      .then((jsonResponse) => {
        let result = jsonResponse.filter(hero =>
          hero.superhero.includes(searchValue) || hero.alter_ego.includes(searchValue) || hero.characters.includes(searchValue)
        );

        dispatch({
          type: "SEARCH_HEROES_SUCCESS",
          payload: result,
        });
      });
  };

  const { heroes } = state;

  return (
    <div className="App">
      <Header text="SEARCHING FOR HEROES" />
      <Search search={search} />

      <div className="heroes">
        {heroes.map((hero, index) => (
          <Hero key={`${index}-${hero.superhero}`} hero={hero} />
        ))}
      </div>
    </div>
  );
};

export default App;
