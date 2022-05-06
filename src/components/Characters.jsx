import React, { useState, useReducer, useMemo, useRef, useCallback } from "react";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const initialState = {
  favs: []
}

const API = 'https://rickandmortyapi.com/api/character/';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favs: [...state.favs, action.payload]
      };
      default:
        return state;
  };
}; 

function Characters() {
  const [search, setSearch] = useState('');
  const [favorites, dispatch] = useReducer(favoritesReducer, initialState);
  const searchInput = useRef(null);
  const characters = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: favorite})
  }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredUsers = useMemo(() =>
    characters.filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }), [search, characters]);

  return (
    <div className="Characters">

      {favorites.favs.map((fav) => (
        <li key={fav.id}>
          {fav.name}
        </li>
      ))}

      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

      {filteredUsers.map(char => (
        <div key={char.name}>
          <h2>{char.name}</h2>
          <button type="button" onClick={() => handleClick(char)}>
            Add to favorites
          </button>
        </div>
      ))}
    </div>
  )
}

export default Characters;