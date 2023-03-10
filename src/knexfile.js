module.exports = {
    mainConnection: {
        client: 'postgres',
        connection: {
            host: 'postgres',
            port: 5432,
            user: 'user',
            password: 'password',
            database: 'JWT-test'
        },
        migrations: {
            directory: './database/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './database/seeds'
        }
    }
}