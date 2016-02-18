//noinspection JSUnresolvedVariable
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const Config = require.main.require('config');

import winston from 'winston';

Config.util.setModuleDefaults('koangular', {
    mongo: {
        uri: 'mongodb://localhost/koangular-dev'
    },
    log: new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: process.env.LOG_LEVEL || 'debug',
                colorize: true
            })
        ]
    }),
    auth: {
        tokenSecret: '1234'
    }
});

export default Config.koangular;