describe("KVStore", function () {
    it("can be constructed", function () {
        expect(new KVStore()).toBeDefined();
    });

    describe("instance methods", function () {
        var store;

        beforeEach(function () {
            store = new KVStore();
        });

        describe("set and get values", function () {
            it("returns undefined for unknown keys", function () {
               expect(store.get("nope")).toBeUndefined();
            });

            it("stores and retrieves simple values", function () {
                store.set("one", 1);
                store.set("two", 13);
                expect(store.get("one")).toEqual(1);
                expect(store.get("two")).toEqual(13);
            });

            it("stores and retrieves complex values", function () {
                var complexKey = {foo: "bar", baz: "bing"};
                var complexValue = [1,2,3,4,5,6,7];

                store.set(complexKey, complexValue);
                expect(store.get(complexKey)).toEqual(complexValue);
            });
        });

        describe("merging KVStores", function () {
            it("returns a new KVStore with values from both", function () {
                store.set("foo", "bar");

                var otherStore = new KVStore();
                otherStore.set("baz", "bing");

                var endStore = store.merge(otherStore);

                expect(endStore.get("foo")).toEqual("bar");
                expect(endStore.get("baz")).toEqual("bing");
                expect(store.get("baz")).toBeUndefined();
                expect(otherStore.get("foo")).toBeUndefined();
            });
        });
    });
});