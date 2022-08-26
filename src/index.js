const express = require('express');
require('./db/mongooes');
const useRouter = require('./router/users')


const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(useRouter);

app.listen(port, () => {
  console.log('sevrer in on port : ' + port);
});


