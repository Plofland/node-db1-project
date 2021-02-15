const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  create,
  update,
  remove
};

function get() {
  // return Promise.resolve('get wired'); <-- testing placeholder

  return db('accounts');
}

function getById(id) {
  // return Promise.resolve('get by id wired'); <-- testing placeholder
  return db('accounts')
    .where('id', id)
    .select('name', 'budget')
    .first();
}

function create(info) {
  // return Promise.resolve('create wired'); <-- testing placeholder
  return db('accounts')
    .insert(info)
    .then(([id]) => {
      return db('accounts').where('id', id).first();
    });
}

function update(id, info) {
  // return Promise.resolve('update wired'); <-- testing placeholder
  const accountId = id;
  return db('accounts')
    .where('id', id)
    .update(info)
    .then(() => {
      return db('accounts').where('id', accountId).first();
    });
}

function remove() {
  return Promise.resolve('remove wired');
}
