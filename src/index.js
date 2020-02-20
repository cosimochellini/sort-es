"use strict";
exports.__esModule = true;
var byString = function (options) {
    if (options === void 0) { options = { desc: false }; }
    return function (first, second) {
        return sort(first.localeCompare(second), options);
    };
};
exports.byString = byString;
var byNumber = function (options) {
    if (options === void 0) { options = { desc: false }; }
    return function (first, second) { return sort(first - second, options); };
};
exports.byNumber = byNumber;
var byDate = function (options) {
    if (options === void 0) { options = { desc: false }; }
    return function (first, second) {
        var _a, _b;
        if (typeof first === "string")
            first = (_a = options.customParser(first), (_a !== null && _a !== void 0 ? _a : new Date(first)));
        if (typeof second === "string")
            second = (_b = options.customParser(second), (_b !== null && _b !== void 0 ? _b : new Date(second)));
        return sort(first.getTime() - second.getTime(), options);
    };
};
exports.byDate = byDate;
var byValue = function (discriminator, sortFn) {
    return function (first, second) {
        var firstItem = getValueByDiscriminator(first, discriminator);
        var secondItem = getValueByDiscriminator(second, discriminator);
        return sortFn(firstItem, secondItem);
    };
};
exports.byValue = byValue;
var getValueByDiscriminator = function (obj, discriminator) {
    return typeof discriminator === "string"
        ? obj[discriminator]
        : discriminator(obj);
};
var sort = function (sortResult, options) {
    return (options.desc ? 1 : -1) * sortResult;
};
exports["default"] = {
    byString: byString,
    byNumber: byNumber,
    byDate: byDate,
    byValue: byValue
};
