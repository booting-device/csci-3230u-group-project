import express from 'express';

const app = express();
const PORT = process.env.PORT || 4242;


app.use(express.json());

import { bookAPI } from "./book-api.js"
app.use('/api', bookAPI)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
