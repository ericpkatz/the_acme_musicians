const express = require('express');
const app = express();

app.get('/api/musicians', (req, res, next)=> {
  res.send([
    { id: 1, name: 'Taylor Swift' },
    { id: 2, name: 'Anybody' },
    { id: 3, name: 'Morgan Wallen' },
  ]);
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
