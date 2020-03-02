// Update with your config settings.

module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'wrco_chest',
            user: 'api_admin',
            password: '666worms',
        },
        migrations: {
            directory: './data/migrations',
        },
        seeds: { directory: './data/seeds' },
        useNullAsDefault: true,
    },

    staging: {
        client: 'pg',
        connection: {
            database: 'wrco_chest',
            user: 'api_admin',
            password: '666worms',
        },
        migrations: {
            directory: './data/migrations',
        },
        seeds: { directory: './data/seeds' },
        useNullAsDefault: true,
    },

    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './data/migrations',
        },
        seeds: { directory: './data/seeds' },
        useNullAsDefault: true,
    },
}
