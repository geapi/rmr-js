function KVStore() {
  var innerStore = {};

  this.set = function (key, value) {
    innerStore[key] = value;
  };

  this.get = function (key) {
    return innerStore[key];
  };

  this.merge = function (otherStore) {
    var finalStore = new KVStore();

    this.keys().forEach(function (key) {
      finalStore.set(key, this.get(key));
    }, this);

    otherStore.keys().forEach(function (key) {
      finalStore.set(key, otherStore.get(key));
    });

    return finalStore;
  };

  this.keys = function () {
    var keys = [];
    for (var key in innerStore) {
      keys.push(key);
    }
    return keys;
  };
}