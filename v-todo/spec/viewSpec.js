describe("View", function () {
  var view;

  beforeEach(function () {
    view = new app.View();
  });

  describe("#show", function () {
    var data;

    beforeEach(function () {
      data = [{
        id: "13",
        title: "testable to-do",
        completed: 0
      }, {
        id: "11",
        title: "tes to-do",
        completed: 1
      }];
    });

    it("renders the template with the correct values inserted", function () {
      var renderedView = view.show(data);

      var firstLI
      =	'<li data-id="13" class="">'
      +		'<div class="view">'
      +			'<input class="toggle" type="checkbox" >'
      +			'<label>testable to-do</label>'
      +			'<button class="destroy"></button>'
      +		'</div>'
      +	'</li>';
      var secondLI
      =	'<li data-id="11" class="completed">'
      +		'<div class="view">'
      +			'<input class="toggle" type="checkbox" checked>'
      +			'<label>tes to-do</label>'
      +			'<button class="destroy"></button>'
      +		'</div>'
      +	'</li>';

      expect(renderedView).toEqual(firstLI + secondLI);
    });

    it("can use a different template", function () {
      view.defaultTemplate = '<strong>{{title}}</strong>';
      var renderedView = view.show(data);

      expect(renderedView).toEqual("<strong>testable to-do</strong><strong>tes to-do</strong>");
    });
  });
  
  describe("#itemCounter", function () {
    it("shows a count based on the number passed", function () {
      expect(view.itemCounter(0)).toEqual("<strong>0</strong> items left");
      expect(view.itemCounter(1)).toEqual("<strong>1</strong> item left");
      expect(view.itemCounter(109)).toEqual("<strong>109</strong> items left");
    });
  });

  describe("#clearCompletedButton", function () {
    it("returns an empty string when no completed todos", function () {
      expect(view.clearCompletedButton(0)).toEqual("");
    });

    it("returns button text with more completed todos", function () {
      expect(view.clearCompletedButton(1)).toEqual("Clear completed (1)");
      expect(view.clearCompletedButton(498375)).toEqual("Clear completed (498375)");
    });
  });
});