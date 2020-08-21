const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'xyz',
    db: 'socialpal_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'contact.socialpal@gmail.com',
            pass: 'Socialpal@321'
        }
    },
    google_client_id: '339835031313-qjl0dkn2e80jab2d6hbkfdn1hfg2met1.apps.googleusercontent.com',
    google_client_secret: 'UvYGd4i2YU_xVpga-VQjYtlT',
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "socialpal",
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production',
    asset_path: process.env.SOCIALPAL_ASSET_PATH,
    session_cookie_key: process.env.SOCIALPAL_SESSION_COOKIE_KEY,
    db: process.env.SOCIALPAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALPAL_GMAIL_USERNAME,
            pass: process.env.SOCIALPAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.SOCIALPAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALPAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIALPAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALPAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.SOCIALPAL_ENVIRONMENT) == undefined ? development: eval(process.env.SOCIALPAL_ENVIRONMENT);