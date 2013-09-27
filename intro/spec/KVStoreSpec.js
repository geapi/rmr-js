describe("KVStore", function () {
	var store;

	beforeEach(function () {
		store = new KVStore();

		this.addMatchers({
		    toHaveKeyPair: function(key, value) {
					this.message = function () {
						return "hello RMR";
					};
		      var store = this.actual;
					return store.get(key) === value;
		    }
		  });
	});

	describe("adding and getting keys", function () {
		it("can store and get key/value pairs", function () {
			store.add("foo", "bar");
			store.add("dogs", "are cute");

			expect(store.get("foo")).toEqual("bar");
			expect(store.get("dogs")).toEqual("are cute");

			expect(store).toHaveKeyPair("dogs", "are cute");
			expect(store).toHaveKeyPair("foo", "bad");
		});

		it("can store a key named 'add'", function () {
			store.add("add", "might break");

			expect(store.get("add")).toEqual("might break");

			store.add("something", "else");
			expect(store.get("something")).toEqual("else");
		});

		it("can add over another key", function () {
			store.add("foo", "bar");
			store.add("foo", "SECOND");

			expect(store.get("foo")).toEqual("SECOND");
			expect(store.keys().length).toEqual(1);
		});
	});

	describe("#delete", function () {
		it("can delete keys", function () {
			store.add("foo", "thing");
			store.delete("foo");
			expect(store.get("foo")).toBeUndefined();
		});
	});

	describe("#merge", function () {
		var store2;

		beforeEach(function () {
			store2 = new KVStore();

			store.add("1", "one");
			store2.add("a", "A");
		});

		it("can merge another store", function () {
			store.merge(store2);

			expect(store.get("1")).toEqual("one");
			expect(store.get("a")).toEqual("A");
		});

		it("doesn't affect the other store when merging", function () {
			store.merge(store2);

			expect(store2.get("a")).toEqual("A");
			expect(store2.keys().length).toEqual(1);
		});

		it("can merge 2 stores with similar values", function () {
			store2.add("1", "only one");
			store.merge(store2);
			expect(store.get("1")).toEqual("only one");
		});
	});

	describe("#keys", function () {
		it("can retrieve keys", function () {
			store.add("1", "one");
			store.add("2", "two");

			expect(store.keys().length).toEqual(2);
			expect(store.keys()).toContain("1");
			expect(store.keys()).toContain("2");
		});

		it("can retrieve different keys?", function () {
			store.add("foo", "baz");
			store.add("ruby", "rails");

			expect(store.keys().length).toEqual(2);
			expect(store.keys()).toContain("foo");
			expect(store.keys()).toContain("ruby");
		});
	});
});