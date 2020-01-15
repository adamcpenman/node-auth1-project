
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
      table.increments()
      table.string("username", 128).notNullable().unique()
      table.string("password", 128).notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
