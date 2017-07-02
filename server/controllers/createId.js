const bcrypt = require('bcryptjs');

module.exports.createId = (id) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(id, salt);
};
