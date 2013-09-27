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
        var $newTodoInput = jQuery("#new-todo");
        $newTodoInput.val(name);
        var e = new Event("keypress");
        e.keyCode = 13;
        $newTodoInput[0].dispatchEvent(e);
      };
    });

    afterEach(function () {
      var store = new app.Store('todos-vanillajs');
      store.drop(function () {});
    });

    it("enables the adding of todo items", function () {
      createItem("Make an acceptance test");

      expect(jQuery("#todo-count").text()).toEqual("1 item left");
    });

    it("allows deletion of todo items", function () {
      createItem("delete me");
      createItem("keep me");

      expect(jQuery("#todo-count").text()).toEqual("2 items left");

      jQuery("li:contains('delete me') .destroy").trigger("click");

      expect(jQuery("#todo-count").text()).toEqual("1 item left");
    });

    it("allows the completion and un-completion of todo items", function () {
      createItem("complete me");

      expect(jQuery("li:contains('complete me')").hasClass("completed")).toEqual(false);
      expect(jQuery("#todo-count").text()).toEqual("1 item left");

      jQuery("li:contains('complete me') .toggle").trigger("click");

      expect(jQuery("li:contains('complete me')").hasClass("completed")).toEqual(true);
      expect(jQuery("#todo-count").text()).toEqual("0 items left");

      jQuery("li:contains('complete me') .toggle").trigger("click");

      expect(jQuery("li:contains('complete me')").hasClass("completed")).toEqual(false);
      expect(jQuery("#todo-count").text()).toEqual("1 item left");
    });

//		$(".datepicker").datepicker();
//
//		spyOn($.fn, "datepicker");
//		app.boot();
//		expect($.fn.datepicker).toHaveBeenCalledWith(".datepicker")

    it("sets all items to active when ALL of them are completed", function () {
      createItem("complete me");
      createItem("leave me");
      createItem("another to ignore");
      createItem("have this one completed too");

      jQuery("#toggle-all").trigger("click");
      jQuery("#toggle-all").trigger("click");

      expect(jQuery("li:contains('complete me')").hasClass("completed")).toEqual(false);
      expect(jQuery("li:contains('have this one completed too')").hasClass("completed")).toEqual(false);
      expect(jQuery("li:contains('leave me')").hasClass("completed")).toEqual(false);
      expect(jQuery("li:contains('another to ignore')").hasClass("completed")).toEqual(false);
    });
  });
});