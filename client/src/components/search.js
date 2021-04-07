import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      history.push(`/search?query=${query}`);
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={pressHandler}
        placeholder="keyword"
      />
    </div>
  );
};
