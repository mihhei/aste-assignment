import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      const queryClean = query.trim();
      if (queryClean) {
        history.push(`/search?query=${queryClean}`);
      } else {
        window.M.toast({ html: 'Keyword is required!' });
        history.push('/about');
      }
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
        required
      />
    </div>
  );
};
