const express = require('express');
require('./db/mongooes');
const useRouter = require('./router/users')
const User = require('./models/users')

const app = express();

const port = 3000;
app.use(express.json());
app.use(useRouter);

app.listen(port, () => {
  console.log('sevrer in on port : ' + port);
});


