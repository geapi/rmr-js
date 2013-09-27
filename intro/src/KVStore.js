var KVStore = function () {
	var internalStore = {};

	this.add = function (key, value) {
		internalStore[key] = value;
	};

	this.get = function (key) {
		return internalStore[key];
	};

	this.delete = function (key) {
		internalStore[key] = undefined;
//		delete internalStore[key]; or this
	};

	this.merge = function (store) {
		var keys = store.keys();
		for (var i in  keys) {
			this.add(keys[i], store.get(keys[i]));
		}
	};

	this.keys = function () {
		var collector = [];
		for (var i in internalStore) {
			collector.push(i);
		}
		return collector;
	};
};