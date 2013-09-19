function KVStore() {
    var innerStore = {};

    this.set = function (key, value) {
        innerStore[key] = value;
    };

    this.get = function(key) {
        return innerStore[key];
    };

    this.merge = function(otherStore){
       var finalStore = new KVStore();
       finalStore.set("")
    }
}