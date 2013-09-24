describe("app", function () {
  it("has a controller", function () {
    expect(app.Controller).toBeDefined();
  });

  it("has a view", function () {
    expect(app.View).toBeDefined();
  });

  it("has a model", function () {
    expect(app.Model).toBeDefined();
  });

  it("has a store", function () {
    expect(app.Store).toBeDefined();
  });

  describe("acceptance testing", function () {
    var createItem;

    beforeEach(function () {
      createItem = function (name) {
        document.getElementById("new-todo").value = name;
        var e = new Event("keypress");
        e.keyCode = 13;
        document.getElementById("new-todo").dispatchEvent(e);
      };
    });

    afterEach(function () {
      var store = new app.Store('todos-vanillajs');
      store.drop(function () {});
    });

    it("enables the adding of todo items", function () {
      createItem("Make an acceptance test");

      expect(document.getElementById("todo-count").innerText).toEqual("1 item left");
    });

    it("allows deletion of todo items", function () {
      createItem("delete me");
      createItem("keep me");

      var lis = document.getElementsByTagName("li");
      var todoList;
      for (var i in lis) {
        if (lis[i].innerText == "delete me") {
          todoList = lis[i];
        }
      }

      todoList.dispatchEvent({type: "click", target: todoList});

      expect(document.getElementById("todo-count").innerText).toEqual("1 item left");
    });
  });
});