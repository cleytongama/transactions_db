import knex from 'knex';
import config from './knexfile';

const environmentConfig = config;

const connection = knex(environmentConfig);

export default connection;