describe('Server.js app file', () => {
    let hofStub;
    let useStub;
    let sendStub;
    let appsCommonStub;
    let appsNrmStub;
    let appsVerifyStub;
    let behavioursSanitiseInputsStub;
    let behavioursSessionTimeoutWarningStub;
    let behavioursCustomDialogStub;
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = reqres.req();
        req.session = {};
        req.body = {
            appName: 'testApp',
            sessionProperties: {
                testProp1: 'test',
                testProp2: 'test'
            }
        };
        res = reqres.res();
        next = sinon.stub();
        sendStub = sinon.stub();
        res.send = sendStub;
        hofStub = sinon.stub();
        useStub = sinon.stub();
        appsCommonStub = sinon.stub();
        appsNrmStub = sinon.stub();
        appsVerifyStub = sinon.stub();
        behavioursSanitiseInputsStub = sinon.stub();
        behavioursSessionTimeoutWarningStub = sinon.stub();
        behavioursCustomDialogStub = sinon.stub();
        useStub.onCall(0).yields(req, res);
        useStub.onCall(1).yields(req, res, next);
        useStub.onCall(2).yields(req, res, next);
        useStub.onCall(3).yields(req, res);
        useStub.onCall(4).yields(req, res, next);
        hofStub.returns({ use: useStub });

        proxyquire('../server', {
            hof: hofStub,
            './apps/common': appsCommonStub,
            './apps/nrm': appsNrmStub,
            './apps/verify': appsVerifyStub,
            './apps/common/behaviours/sanitise-inputs': behavioursSanitiseInputsStub,
            'hof/components/session-timeout-warning': behavioursSessionTimeoutWarningStub,
            './apps/common/behaviours/custom-dialog-text': behavioursCustomDialogStub,
            './config': { env: 'test' }
        });
    });

    describe('Setup HOF Configuration', () => {
        it('calls hof with a suitable config', () => {
            hofStub.should.have.been.calledOnce.calledWith(sinon.match({
                appName: sinon.match.string,
                theme: sinon.match.string,
                routes: sinon.match.array,
                behaviours: sinon.match.array,
                session: sinon.match.object
            }));
        });

        it('should call the app use method five times if env set to test', () => {
            useStub.callCount.should.equal(5);
        });

        it('should call the app use method five times if env set to development', () => {
            const use = sinon.stub();
            const hof = () => ({ use });

            proxyquire('../server', {
                hof: hof,
                './config': { env: 'development' }
            });

            useStub.callCount.should.equal(5);
        });

        it('should call the app use method four times if env set to anything else', () => {
            const use = sinon.stub();
            const hof = () => ({ use });

            proxyquire('../server', {
                hof: hof,
                './config': { env: 'production' }
            });

            use.should.have.callCount(4);
        });
    });

    describe('Use Test Endpoint', () => {
        it('it should take /test/bootstrap-session as the first argument', () => {
            const useArgs = useStub.getCall(3).args[0];
            useArgs.should.eql('/test/bootstrap-session');
        });

        it('the send method on res should be called', () => {
            sendStub.should.have.been.calledOnce.calledWithExactly('Session populate complete');
        });

        it('if no app name key set but a redis session is available set the app name key to an empty object', () => {
            expect(req.session['hof-wizard-testApp']).to.exist;
        });

        it('if session properties are set in the body they are set on hof-wizard-appName', () => {
            req.session['hof-wizard-testApp'].should.eql(
                {
                    testProp1: 'test',
                    testProp2: 'test'
                }
            );
        });
    });
});
