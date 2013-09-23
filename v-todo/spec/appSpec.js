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
});