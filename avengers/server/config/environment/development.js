'use strict';

// Development specific configuration
// ==================================
module.exports = {
    godamHost: 'https://qa-godam.delhivery.com/',
    comsHost: 'http://qa.coms.delhivery.com/',
    dsnsHost: 'https://qa-pcms.delhivery.com/',
    certFile: '../../delcerts/STAR_delhivery_com.crt',
    keyFile: '../../delcerts/server.key',
    /*Google Authentication Keys*/
    CLIENT_ID: '452674739679-2davdncfcs7tse2736psn2sslno6t8jg.apps.googleusercontent.com',
    CLIENT_SECRET: 'xLh_hNnN1XN2IsrflQPyjS2p',
    REDIRECT_URL: 'http://localhost:9000/api/login-gid/callback',
    /*pcms server settings*/
    PCMS_ACCESS_TOKEN: 'e6c54e958778655933c0e299157e0195d6f135ad',
    COMS_ACCESS_TOKEN: '27c7fffa9f7e4edabec6f27222581bd1c2eb58c7',
    PSMS_ACCOUNT_ID: 10,
    mock: false
};
