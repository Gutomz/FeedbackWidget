import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`)
});
