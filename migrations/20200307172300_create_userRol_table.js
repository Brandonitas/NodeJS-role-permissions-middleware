
exports.up = function(knex) {
    return knex.schema
      .createTable('userRol', (table) => {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('rol', 255).notNullable();
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('userRol');
  };