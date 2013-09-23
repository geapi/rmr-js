describe("Store", function () {
  var store, noop;

  beforeEach(function () {
    store = new app.Store("test store");
    noop = function () {};
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

  describe("findAll", function () {
    it("calls back with an empty array when empty", function () {
      var callbackSpy = jasmine.createSpy("callback");
      store.findAll(callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith([]);
    });

    it("calls back with each item that is added", function () {
      store.save({a: "A"}, noop);
      store.save({b: "B"}, noop);
      store.save({c: "C"}, noop);

      var callbackSpy = jasmine.createSpy("callback");
      store.findAll(callbackSpy);

//      expect(callbackSpy).toHaveBeenCalledWith([
//        {id: 1, a: "A"},
//        {id: 2, b: "B"},
//        {id: 3, c: "C"}
//      ]);

      expect(callbackSpy).toHaveBeenCalled();
      var callbackData = callbackSpy.mostRecentCall.args[0];
      expect(callbackData.length).toEqual(3);
      expect(callbackData).toContain({a: "A", id: jasmine.any(Number)});
      expect(callbackData).toContain({b: "B", id: jasmine.any(Number)});
      expect(callbackData).toContain({c: "C", id: jasmine.any(Number)});
    });

    it("does not crash when called with no arguments", function () {
      try {
        store.findAll();
      } catch (e) {
        throw "Store#findAll threw!";
      }
    });
  });
});