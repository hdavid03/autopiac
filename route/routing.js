
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

    app.get('/hirdetes/:idad',
        getAdMW(objRepo),
        checkUserMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'buying'));

    app.use('/belepes',
        checkUserMW(objRepo),
        renderMW(objRepo, 'login'));

    app.post('/',
        checkUserMW(objRepo),
	authMW(objRepo),
	getUserMW(objRepo),
        renderMW(objRepo, 'index'));

    app.use('/profil/:iduser',
        checkUserMW(objRepo),
	authMW(objRepo),
	getUserMW(objRepo),
        renderMW(objRepo, 'edituser'));
   
    app.post('/profil/:iduser/edit',
        checkUserMW(objRepo),
	authMW(objRepo),
	getUserMW(objRepo),
	saveUserMW(objRepo),
        renderMW(objRepo, 'edituser'));

    app.use('/uj_jelszo',
        checkUserMW(objRepo),
	renderMW(objRepo, 'newpasswd'));
	
    app.post('/uj_jelszo',
        checkUserMW(objRepo),
	newPasswdMW(objRepo),
	saveUserMW(objRepo),
	renderMW(objRepo, 'newpasswd'));

    app.use('/regisztracio',
        checkUserMW(objRepo),
        renderMW(objRepo, 'registration'));

    app.post('/ujfelhaszn',
        authMW(objRepo),
        checkUserMW(objRepo),
	saveUserMW(objRepo),
        renderMW(objRepo, 'insertuser'));

    app.use('/hirdetes/:iduser/ajanlataim',
        authMW(objRepo),
        checkUserMW(objRepo),
        getAdListByUserIdMW(objRepo),
        renderMW(objRepo, 'myoffers'));

    app.use('/hirdetes/:iduser/new',
        authMW(objRepo),
        checkUserMW(objRepo),
        renderMW(objRepo, 'advertise'));

    app.post('/hirdetes/:iduser/hirdetesfeladas',
        authMW(objRepo),
        checkUserMW(objRepo),
	saveAdMW(objRepo),
        renderMW(objRepo, 'insertad'));

    app.get('/hirdetes/:iduser/delete/:idhirdetes',
        authMW(objRepo),
        checkUserMW(objRepo),
	getAdMW(objRepo),
	getAdListById(objRepo),
	deleteAdMW(objRepo)),
	renderMW(objRepo, 'myoffers'));

    app.get('/hirdetes/:iduser/edit/:idhirdetes',
        authMW(objRepo),
        checkUserMW(objRepo),
        getAdMW(objRepo),
	saveAdMW(objRepo),
        renderMW(objRepo, 'editad'));

};
