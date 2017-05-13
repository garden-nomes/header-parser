const express = require('express');
const userAgentParser = require('ua-parser-js');
const app = express();

app.set('port', process.env.PORT || 8000);

function language(req) {
  const language = req.get('accept-language');
  return language ? language.split(',')[0] : null;
}

function operating_system(req) {
  const { os } = userAgentParser(req.headers['user-agent']);
  return os.name ? os.name + (os.name ? ' ' + os.version : '') : null;
}

app.get('/', (req, res) => {
  const result = {
    ip_address: req.ip,
    language: language(req),
    operating_system: operating_system(req),
  };

  console.log(JSON.stringify(result));
  res.send(result);
});

app.listen(app.get('port'), () => {
  console.log(`Server up and running on port ${app.get('port')}...`);
});
