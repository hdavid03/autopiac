
const authMW = require('../middleware/auth/authMW');
const checkUserMW = require('../middleware/auth/checkUserMW');
const renderMW = require('../middleware/renderMW');
const deleteAdMW = require('../middleware/ad/deleteAdMW');
const getAdListByUserIdMW = require('../middleware/ad/getAdListByUserIdMW');
const getAdListMW = require('../middleware/ad/getAdListMW');
const getAdMW = require('../middleware/ad/getAdMW');
const saveAdMW = require('../middleware/ad/saveAdMW');
const getUserMW = require('../middleware/user/getUserMW');
const saveUserMW = require('../middleware/user/saveUserMW');
const newPasswdMW = require('../middleware/user/newPasswdMW');

module.exports = function (app) {
    const objRepo = {};

    app.use('/',
        getAdListMW(objRepo),
        checkUserMW(objRepo),
        renderMW(objRepo, 'index'));

    app.get('/hirdetes/:idhirdetes',
        getAdMW(objRepo),
        checkUserMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'buying'));

    app.use('/belepes',
        checkUserMW(objRepo),
        saveNagymamaMW(objRepo),
        renderMW(objRepo, 'login'));

    app.use('/regisztracio',
        checkUserMW(objRepo),
        renderMW(objRepo, 'registration'));

    app.post('/ujfelhaszn',
        authMW(objRepo),
        checkUserMW(objRepo),
        renderMW(objRepo, 'insertuser'));

    app.use('/hirdeteseim',
        authMW(objRepo),
        checkUserMW(objRepo),
        getAdListByUserIdMW(objRepo),
        renderMW(objRepo, 'myoffers'));

    app.use('/hirdeteseim/edit/:idhirdetes',
        authMW(objRepo),
        checkUserMW(objRepo),
        getAdMW(objRepo),
        renderMW(objRepo, 'editad'));

    app.use('/befott/:nagymamaid/new',
        authMW(objRepo),
        getNagymamaMW(objRepo),
        saveBefottMW(objRepo),
        renderMW(objRepo, 'befotteditnew'));

    app.use('/befott/:nagymamaid/edit/:befottid',
        authMW(objRepo),
        getNagymamaMW(objRepo),
        getBefottMW(objRepo),
        saveBefottMW(objRepo),
        renderMW(objRepo, 'befotteditnew'));

    app.get('/befott/:nagymamaid/del/:befottid',
        authMW(objRepo),
        getNagymamaMW(objRepo),
        getBefottMW(objRepo),
        delBefottMW(objRepo),
        renderMW(objRepo, 'befotteditnew'));
};
