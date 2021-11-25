const authMW = require('../middlewares/auth/authMW');
const checkUserMW = require('../middlewares/auth/checkUserMW');
const loginUserMW = require('../middlewares/auth/loginUserMW');
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
        checkUserMW(objRepo),
        renderMW(objRepo, 'index'));

    app.get('/hirdetes/:idad',
        getAdMW(objRepo),
        checkUserMW(objRepo),
        getUserMW(objRepo),
        renderMW(objRepo, 'buying'));

    app.get('/belepes',
        checkUserMW(objRepo),
        renderMW(objRepo, 'login'));

    app.post('/',
        checkUserMW(objRepo),
		loginUserMW(objRepo),
		authMW(objRepo),
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
		getAdListByUserIdMW(objRepo),
		deleteAdMW(objRepo),
		renderMW(objRepo, 'myoffers'));

    app.get('/hirdetes/:iduser/edit/:idhirdetes',
        authMW(objRepo),
        checkUserMW(objRepo),
        getAdMW(objRepo),
		saveAdMW(objRepo),
        renderMW(objRepo, 'editad'));
};
