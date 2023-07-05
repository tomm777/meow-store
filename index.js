const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('views/pages'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`포트: ${PORT} 서버 가동 시작`);
});
