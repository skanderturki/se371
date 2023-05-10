var sum2 = function (arr) {
    var s = 0;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var e = arr_1[_i];
        s += e;
    }
    ;
    return s;
};
var map2 = function (f, arr) {
    var res = [], i = 0;
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var e = arr_2[_i];
        res[i] = f(e);
        i++;
    }
    ;
    return res;
};
var arr2 = [[2, 3], [4, 6, 7], [8, 2], [89, 12]];
console.log(map2(sum2, arr2));
