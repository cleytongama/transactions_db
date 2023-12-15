import dotenv from 'dotenv';
dotenv.config({ path: '.env.local', debug: true });

const config = {
    client: 'pg',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};

export default config;
