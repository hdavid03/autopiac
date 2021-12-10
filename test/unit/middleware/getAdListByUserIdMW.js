var expect = require('chai').expect;
var getAdListByUserIdMW = require('../../../middlewares/ad/getAdListByUserIdMW');


describe('getAdListByUserIdMW middleware ', function () {

    it('it should return with an list of ads by user id', function (done) {
        const middleware = getAdListByUserIdMW(
            { AdModel: {
                    find: (params, callback) => {
                        callback(undefined, ['ad1', 'ad2', 'ad3']);
                    }
                }
            });

        const reqMock = {
            params: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {
                regUser: 'user'
            }
        };

        middleware(reqMock, resMock, (err)=>{
            expect(resMock.locals.adsById).to.be.eql(['ad1', 'ad2', 'ad3']);
        });
        done();
    });

    it('it should return with undefined, because there is a db problem', function (done) {
        const middleware = getAdListByUserIdMW(
            { AdModel: {
                    find: (params, callback) => {
                        callback('error', ['ad1', 'ad2', 'ad3']);
                    }
                }
            });

        const reqMock = {
            params: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {
                regUser: 'user'
            }
        };

        middleware(reqMock, resMock, (err)=>{
            expect(resMock.locals.adsById).to.be.eql(undefined);
        });
        done();
    });

    it('it should return with undefined, because the list is undefined', function (done) {
        const middleware = getAdListByUserIdMW(
            { AdModel: {
                    find: (params, callback) => {
                        callback(undefined, undefined);
                    }
                }
            });

        const reqMock = {
            params: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {
                regUser: 'user'
            }
        };

        middleware(reqMock, resMock, (err)=>{
            expect(resMock.locals.adsById).to.be.eql(undefined);
        });
        done();
    });

    it('it should return with undefined, because there is no user', function (done) {
        const middleware = getAdListByUserIdMW(
            { AdModel: {
                    find: (params, callback) => {
                        callback(undefined, ['ad1', 'ad2', 'ad3']);
                    }
                }
            });

        const reqMock = {
            params: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {},
            redirect: (param)=>{
                expect(param).to.be.eql('/');
            }
        };

        middleware(reqMock, resMock, (err)=>{
            expect(resMock.locals.adsById).to.be.eql(undefined);
        });
        done();
    });

});
