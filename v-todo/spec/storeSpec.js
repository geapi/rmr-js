describe("Store", function () {
  var store;

  beforeEach(function () {
    store = new app.Store("test store");
  });

  afterEach(function () {
    store.drop(function () {});
  });

  describe("save", function () {
    it("calls back when done", function () {
      var obj = {foo: "bar"};
      var callback = jasmine.createSpy("callback");
      store.save(obj, callback);

      expect(callback).toHaveBeenCalled();
    });
  });
});