import express from 'express';
const port = 3333;
const app = express();

app.listen(port, () => {
  console.log(`HTTP server running on port ${port}`)
});
