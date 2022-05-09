
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DB_DATABASE || "",
    "host": process.env.DB_HOST || "127.0.0.1",
    "dialect": process.env.DB_CONNECTION || "mysql",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "use_env_variable": "CLEARDB_DATABASE_URL",
    "dialect": process.env.DB_CONNECTION || "mysql",
  }
}