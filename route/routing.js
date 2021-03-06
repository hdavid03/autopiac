const authMW = require('../middlewares/auth/authMW');
const checkUserMW = require('../middlewares/auth/checkUserMW');
const loginUserMW = require('../middlewares/auth/loginUserMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const renderMW = require('../middlewares/renderMW');
const deleteAdMW = require('../middlewares/ad/deleteAdMW');
const getAdListByUserIdMW = require('../middlewares/ad/getAdListByUserIdMW');
const getAdListMW = require('../middlewares/ad/getAdListMW');
const getAdMW = require('../middlewares/ad/getAdMW');
const saveAdMW = require('../middlewares/ad/saveAdMW');
const getUserMW = require('../middlewares/user/getUserMW');
const saveUserMW = require('../middlewares/user/saveUserMW');
const newPasswdMW = require('../middlewares/user/newPasswdMW');

const UserModel = require('../models/user');
const AdModel = require('../models/ad');

module.exports = function (app) {
    const objRepo = {
		UserModel: UserModel,
		AdModel: AdModel
	};

    app.get('/',
        getAdListMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'index'));

	app.get('/kijelentkezes',
		authMW(objRepo),
		logoutMW(objRepo),
		renderMW(objRepo, 'logout'));

    app.get('/hirdetes/:idhirdetes',
        getAdMW(objRepo),
		getUserMW(objRepo),
        renderMW(objRepo, 'buying'));

	app.get('/hirdetes/buy/:idhirdetes/:iduser',
		getAdMW(objRepo),
		getUserMW(objRepo),
		renderMW(objRepo, 'buying'));

    app.get('/belepes',
        checkUserMW(objRepo),
        renderMW(objRepo, 'login'));

    app.post('/',
		loginUserMW(objRepo),
		getAdListMW(objRepo),
        renderMW(objRepo, 'index'));

    app.get('/profil/:iduser',
		authMW(objRepo),
		getUserMW(objRepo),
        renderMW(objRepo, 'edituser'));
   
    app.post('/profil/:iduser/edit',
		authMW(objRepo),
		getUserMW(objRepo),
		saveUserMW(objRepo),
        renderMW(objRepo, 'edituser'));

	app.get('/uj_jelszo',
		checkUserMW(objRepo),
		renderMW(objRepo, 'newpasswd'));

    app.post('/uj_jelszo/eredmeny',
		checkUserMW(objRepo),
		newPasswdMW(objRepo),
		renderMW(objRepo, 'newpasswd'));

    app.get('/regisztracio',
        checkUserMW(objRepo),
        renderMW(objRepo, 'registration'));

	app.post('/ujfelhaszn',
		checkUserMW(objRepo),
		saveUserMW(objRepo),
		renderMW(objRepo, 'insertuser'));

    app.get('/hirdetes/ajanlataim/:iduser',
        authMW(objRepo),
		getUserMW(objRepo),
        getAdListByUserIdMW(objRepo),
        renderMW(objRepo, 'myoffers'));

    app.get('/hirdetes/:iduser/new',
        authMW(objRepo),
		getUserMW(objRepo),
        renderMW(objRepo, 'advertise'));

    app.post('/hirdetes/:iduser/hirdetesfeladas',
        authMW(objRepo),
		getUserMW(objRepo),
		saveAdMW(objRepo),
        renderMW(objRepo, 'insertad'));

    app.get('/hirdetes/:iduser/delete/:idhirdetes',
        authMW(objRepo),
		getUserMW(objRepo),
		getAdMW(objRepo),
		deleteAdMW(objRepo),
		getAdListByUserIdMW(objRepo),
		renderMW(objRepo, 'myoffers'));

	app.get('/hirdetes/:iduser/edit/:idhirdetes',
		authMW(objRepo),
		getAdMW(objRepo),
		getUserMW(objRepo),
		renderMW(objRepo, 'editad'));

    app.post('/hirdetes/:iduser/edit/:idhirdetes/modified',
        authMW(objRepo),
        getAdMW(objRepo),
		getUserMW(objRepo),
		saveAdMW(objRepo),
        renderMW(objRepo, 'editad'));
};
