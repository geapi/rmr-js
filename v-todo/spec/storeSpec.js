describe("Store", function () {
  var store, noop, callbackSpy;

  beforeEach(function () {
    store = new app.Store("test store");
    noop = function () { };
    callbackSpy = jasmine.createSpy("callback");
  });

  afterEach(function () {
    store.drop(noop);
  });

  describe("constructor", function(){
    it("calls the callback with the local store name", function () {
      new app.Store("test store", callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith({ todos : [ ] });
    });

    it("does not crash when called with no callback", function () {
      expect(function () {
        new app.Store("test store");
      }).not.toThrow();
    });

    it("shares data betweeen stores using the same name", function () {
      var storeOne = new app.Store("myStore");
      storeOne.drop(noop);
      var storeTwo = new app.Store("myStore");
      storeTwo.drop(noop);

      storeOne.save({an: "item"}, noop);
      storeTwo.findAll(callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith([{an: "item", id: jasmine.any(Number)}]);
    });

  });

  describe("save", function () {
    it("calls back when done", function () {
      var obj = {foo: "bar"};
      store.save(obj, callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith([{foo: "bar", id: jasmine.any(Number)}]);
    });

    it("can modify objects in place", function () {
      var id;
      store.save({foo: "bar"}, function (items) {
        id = items[0].id;
      });

      store.save(id, {foo: "stuff"});

      store.findAll(callbackSpy);

      expect(callbackSpy).toHaveBeenCalled();
      var callbackData = callbackSpy.mostRecentCall.args[0];
      expect(callbackData.length).toEqual(1);
      expect(callbackData[0]).toEqual({foo: "stuff", id: id});
    });
  });

  describe("findAll", function () {
    it("calls back with an empty array when empty", function () {
      store.findAll(callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith([]);
    });

    it("calls back with each item that is added", function () {
      store.save({a: "A"}, noop);
      store.save({b: "B"}, noop);
      store.save({c: "C"}, noop);

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
      expect(function () {
        store.findAll();
      }).not.toThrow();
    });
  });

  describe("find", function () {
    it("calls back with an empty array when the store is empty", function () {
      store.find({}, callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith([]);
    });

    it("returns matching objects from the store", function () {
      store.save({foo: "bar", hello: "world"}, noop);
      store.save({foo: "bar", bye: "planet"}, noop);
      store.save({foo: "NOPE", stuff: "is cool"}, noop);

      store.find({foo: "bar"}, callbackSpy);

      expect(callbackSpy).toHaveBeenCalled();
      var callbackData = callbackSpy.mostRecentCall.args[0];
      expect(callbackData.length).toEqual(2);
      expect(callbackData).toContain({foo: "bar", hello: "world", id: jasmine.any(Number)});
      expect(callbackData).toContain({foo: "bar", bye: "planet", id: jasmine.any(Number)});
    });

    it("does not crash when called with no arguments", function () {
      expect(function () {
        store.find();
      }).not.toThrow();
    });
  });

  describe("remove", function () {
    it("removes and item from the store", function () {
      var id;
      store.save({a: "A"}, function (items) {
        id = items[0].id;
      });
      store.save({b: "B"}, noop);

      store.findAll(callbackSpy);
      var callbackData = callbackSpy.mostRecentCall.args[0];

      expect(callbackData.length).toEqual(2);

      store.remove(id, noop);
      store.findAll(callbackSpy);
      callbackData = callbackSpy.mostRecentCall.args[0];
      expect(callbackData.length).toEqual(1);
    });

  });
});