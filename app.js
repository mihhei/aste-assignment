const express = require('express');
const app = express();

app.use('/api/aste', require('./routes/search.routes'));

app.use(express.json({ extends: true }));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
    res.redirect('/');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}...`);
});
