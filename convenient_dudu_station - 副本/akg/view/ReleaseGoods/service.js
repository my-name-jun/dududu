var service = {
    interface: require('../../network/network'),

    getCategoryTwoByOne: function (oneId, twoList) {
        var deferred = Deferred();
        var that = this;
        var list = [];
        for (var i = 0; i < twoList.length; i++) {
            var two = twoList[i];
            if (two.id.substring(0, 1) == oneId) {
                list.push(two);
            }
        }
        deferred.resolve(list);
        return deferred.promise;
    },
    //GEN_services
};

module.exports = service;