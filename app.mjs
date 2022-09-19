import axios from 'axios';
import express from 'express';

const { PORT } = process.env;

const app = express();

app.get('/', async (_req, res) => {
  try {
    const { data, status } = await axios.get('/config.json', { baseURL: 'https://cst-ssc.apps.cic.gc.ca' });
    res.status(status).json({ status, data });
  } catch (error) {
    console.error(JSON.stringify({ error }));
    const { data, status } = error.response;
    res.status(status).json({ status, data });
  }
});

app.listen(PORT, () => console.log(`UP & RUNNING ON "${PORT}"`));
