const cloudinary = require('cloudinary').v2;
const Env = use('Env');

cloudinary.config({
  cloud_name: 'dwjlyg6tf',
  api_key: '896953447952968',
  api_secret: 'M2N3Z4t_0WxhaVL64sl3d9aSQmk'
});

module.exports = cloudinary;
