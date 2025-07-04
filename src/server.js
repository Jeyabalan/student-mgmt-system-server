import { app } from './app.js';
import { connectMongoDB } from './db/connection.js';

const PORT = process.env.PORT || 5000

await connectMongoDB()

app.listen(PORT, () => {
  console.log(`Server Start on PORT ${PORT}`)
})
