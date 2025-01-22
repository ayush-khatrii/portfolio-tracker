import "dotenv/config";
import cors from 'cors';
import express from 'express'
const app = express();
const PORT = process.env.PORT || 3000;
import holdingRouter from "./routes/holding.routes.js";

app.use(cors())
app.use(express.json());
app.use('/api/holding', holdingRouter);
// add cors policy

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));