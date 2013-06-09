/**
 * @author rbezemer
 */
define(['Squire' ], function (Squire) {
  describe("Unit Tests for", function(){
    describe("application.js (Ember Initial setup)", function() {
      var async = new AsyncSpec(this);
      var mockEmber;
      var createStub;
      var appObject;
      var deferStub;
      async.beforeEach(function (done) {
        
        createStub = sinon.stub();
        deferStub = sinon.stub();
        createStub.returns({deferReadiness:deferStub});
        mockEmber = {Application:{
          create: createStub
        }};
        var injector = new Squire();
        injector.mock('ember', mockEmber)
        .mock('handlebars', sinon.stub())
        .mock('jquery', sinon.stub())
        .require(['application'], function(theApp) {
          appObject = theApp;
          done();
        });
      },2);
      afterEach(function() {
        
      });
      it("should create an ember application ", function() {
        expect(createStub).toHaveBeenCalledWith({
              rootElement: '#portalmage',
              LOG_TRANSITIONS: true
            });
      });
      
      it('should defer readiness of the environment', function() {
        expect(deferStub).toHaveBeenCalled();
      });
      it('should return the Application object', function(){
          expect(appObject).toBeDefined();
      });
    });
  });
});

