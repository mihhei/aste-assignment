import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Loader } from './loader';
import { OutputList } from './outputlist';

export const DataOutput = () => {
  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('query'));
  const [news, setNews] = useState([]);
  const { request, loading } = useHttp();

  const newSearchHandler = useCallback((event) => {
    if (event.key === 'Enter') {
      setQuery(event.target.value);
    }
  }, []);
  const getData = useCallback(async () => {
    if (query) {
      try {
        const data = await request(
          `/api/aste/search?query=${query}`,
          'GET',
          null
        );
        setNews(data);
      } catch (e) {
        console.log(e);
      }
    } else {
      setNews([]);
    }
  }, [request, query]);

  useEffect(() => {
    getData();
    const inputSearch = document.getElementById('search');
    inputSearch.addEventListener('keypress', newSearchHandler);
    return () => inputSearch.removeEventListener('keypress', newSearchHandler);
  }, [getData, newSearchHandler, query]);
  return (
    <>
      {loading && <Loader />}
      {!loading && <OutputList data={news} />}
    </>
  );
};
