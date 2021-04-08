const { Router } = require('express');
const router = Router();
const config = require('config');
const axios = require('axios').default;
const moment = require('moment');

router.get('/search?', async (req, res) => {
  const query = req.query.query;
  try {
    const dayBefore = moment.utc().subtract(24, 'hours').format();
    const dataResponse = [];
    await getNewsApi(query, dataResponse, dayBefore);
    await getGnews(query, dataResponse, dayBefore);
    if (dataResponse.length) {
      res.json(dataResponse);
    } else {
      res.status(500).json({ message: 'Something goes wrong!' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something goes wrong!' });
  }
});

async function getNewsApi(query, dataResponse, dayBefore) {
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: { q: query, from: dayBefore, language: 'en' },
    headers: {
      'X-Api-Key': config.get("newsApiKey"),
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      getData(response.data.articles, 'https://newsapi.org/', dataResponse);
    })
    .catch(function (error) {
      console.error(error);
    });
}

async function getGnews(query, dataResponse, dayBefore) {
  const options = {
    method: 'GET',
    url: `https://gnews.io/api/v4/search?q=${query}&from=${dayBefore}&token=${config.get("gNewsKey")}`,
  };

  await axios
    .request(options)
    .then(function (response) {
      getData(response.data.articles, 'https://gnews.io/', dataResponse);
    })
    .catch(function (error) {
      console.error(error);
    });
}

const getData = (dataArray, source, dataResponse) => {
  dataArray.map((item) => {
    const searchItem = {
      title: item.title,
      url: item.url,
      published: item.publishedAt,
      source,
    };
    dataResponse.push(searchItem);
  });
};

module.exports = router;
