const expect = require('chai').expect;
const getUserMW = require('../../../middlewares/user/getUserMW');

describe('getUserMW middleware ', function () {

    it('it should return a user', function (done) {
        const middleware = getUserMW(
            { UserModel: {
                    findOne: (params, callback) => {
                        callback(undefined, 'user');
                    }
                }
        });

        const reqMock = {
            session: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {}
        };

        middleware(reqMock, resMock, (err)=>{
            expect(resMock.locals.regUser).to.be.eql('user');
        });
        done();
    });

    it('it should return an undefined, because user is undefined', function (done) {
        const middleware = getUserMW(
            { UserModel: {
                    findOne: (params, callback) => {
                        callback(undefined, undefined);
                    }
                }
            });

        const reqMock = {
            session: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {}
        };

        middleware(reqMock, resMock, (err)=>{
            expect(resMock.locals.regUser).to.be.eql(undefined);
        });
        done();
    });

    it('it should return with error, because there is a db problem', function (done) {
        const middleware = getUserMW(
            { UserModel: {
                    findOne: (params, callback) => {
                        callback('error', 'user');
                    }
                }
            });

        const reqMock = {
            session: {
                iduser: '10'
            }
        };
        const resMock = {
            locals: {}
        };

        middleware(reqMock, resMock, (err)=>{
            expect(err).to.be.eql('error');
        });
        done();
    });
});