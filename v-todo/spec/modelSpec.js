describe("Model", function () {
  var fakeStore, model, callbackSpy;

  beforeEach(function () {
    fakeStore = jasmine.createSpyObj("Store", ["save", "find", "remove", "drop", "findAll"]);
    model = new app.Model(fakeStore);
    callbackSpy = jasmine.createSpy("callback");
  });

  describe("#create", function () {
    it("creates a new Todo and stores it", function () {
      model.create("My New Todo");
      expect(fakeStore.save).toHaveBeenCalledWith({title: "My New Todo", completed: 0}, jasmine.any(Function));
    });

    it("optionally takes a callback to pass on to the store", function () {
      model.create("Awesome", callbackSpy);
      expect(fakeStore.save).toHaveBeenCalledWith({title: "Awesome", completed: 0}, callbackSpy);
    });

    it("creates a blank item when called with no arguments", function () {
      model.create();
      expect(fakeStore.save).toHaveBeenCalledWith({title: "", completed: 0}, jasmine.any(Function));
    });

    it("cleans up leading and trailing whitespace in the title", function () {
      model.create("             My New Todo                  ");
      expect(fakeStore.save).toHaveBeenCalledWith({title: "My New Todo", completed: 0}, jasmine.any(Function));
    });
  });

  describe("#read", function () {
    it("finds all todos when no query is provided", function () {
      model.read(callbackSpy);

      expect(fakeStore.findAll).toHaveBeenCalledWith(callbackSpy);
    });

    it("finds by id when a string or number is passed", function () {
      model.read(23, callbackSpy);
      expect(fakeStore.find).toHaveBeenCalledWith({id: 23}, callbackSpy);

      model.read("some cool stuff", callbackSpy);
      expect(fakeStore.find).toHaveBeenCalledWith({id: "some cool stuff"}, callbackSpy);
    });

    it("queries by parameters when passed an object", function () {
      model.read({foo: "bar"}, callbackSpy);
      expect(fakeStore.find).toHaveBeenCalledWith({foo: "bar"}, callbackSpy);
    });
  });

  describe("#update", function () {
    it("calls save on the store with the passed arguments", function () {4
      model.update(13, {fooz: "now"}, callbackSpy);
      expect(fakeStore.save).toHaveBeenCalledWith(13, {fooz: "now"}, callbackSpy);
    });
  });

  describe("#remove", function () {
    it("calls remove on the store with the passed arguments", function () {
      model.remove(13, callbackSpy);
      expect(fakeStore.remove).toHaveBeenCalledWith(13, callbackSpy);
    });
  });

  describe("#remove", function () {
    it("calls drop on the store with the passed callback", function () {
      model.removeAll(callbackSpy);
      expect(fakeStore.drop).toHaveBeenCalledWith(callbackSpy);
    });
  });

  describe("getCount", function () {
    it("returns an object with counts corresponding to the state of todos", function () {
      fakeStore.findAll.andCallFake(function (callback) {
        callback([
          {completed: 1},
          {completed: 1},
          {completed: 1},
          {completed: 0},
          {completed: 1},
          {completed: 0},
          {completed: 0}
        ]);
      });

      expect(model.getCount()).toEqual({
        completed: 4,
        active: 3,
        total: 7
      })
    });
  });
});