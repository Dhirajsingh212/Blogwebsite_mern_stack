const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port ${process.env.PORT}`);
});