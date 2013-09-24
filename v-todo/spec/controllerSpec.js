describe("Controller", function () {
  var controller, fakeModel, fakeView;

  beforeEach(function () {
    fakeModel = jasmine.createSpyObj("Model", ["read", "create"]);
    var fakeModelData = [
      {id: 1, title: "Fooz", completed: 0},
      {id: 2, title: "Ball", completed: 1}
    ];
    fakeModel.read.andCallFake(function (query, callback) {
      if (typeof(query) === "function") {
        callback = query;
      }

      if (typeof(query) === "object") {
        callback.call(this, fakeModelData.filter(function (todo) {
          for (var q in query) {
            return query[q] === todo[q];
          }
        }));
      } else {
        callback(fakeModelData);
      }
    });

    fakeView = jasmine.createSpyObj("View", ["show"]);
    fakeView.show.andCallFake(function (data) {
      var ids = [];
      data.forEach(function (item) {
        ids.push(item.id);
      });
      return ids.join(", ");
    });

    controller = new app.Controller(fakeModel, fakeView);

    document.getElementById("jasmine_content").innerHTML = "<div id='#todo-list'></div>";
  });

  describe("constructor", function () {
    it("assigns the model and view", function () {
      expect(controller.model).toEqual(fakeModel);
      expect(controller.view).toEqual(fakeView);
    });
  });

  describe("#showAll", function () {
    it("renders every todo into the todoList", function () {
      controller.showAll();
      expect(document.getElementById("todo-list").innerText).toEqual("1, 2");
    });
  });

  describe("showActive", function () {
    it("renders each active todo into the todoList", function () {
      controller.showActive();
      expect(document.getElementById("todo-list").innerText).toEqual("1");
    });
  });

  describe("showCompleted", function () {
    it("renders each completed todo into the todoList", function () {
      controller.showCompleted();
      expect(document.getElementById("todo-list").innerText).toEqual("2");
    });
  });

  describe("#addItem", function () {
    it("only fires on the ENTER key (keycode 13)", function () {
      var event = {keyCode: 1};
      controller.addItem(event);
      expect(fakeModel.create).not.toHaveBeenCalled();

      event = {keyCode: 13, target: {value: "hey"}};
      controller.addItem(event);
      expect(fakeModel.create).toHaveBeenCalled();
    });

    it("doesn't not add empty items", function () {
      var event = new Event("keypress");
      controller.addItem(event);
    });
  });

  describe("url events", function () {
    it("responds to page load");
    it("responds to hash change");
  });
});