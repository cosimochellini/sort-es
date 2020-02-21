"use strict";
exports.__esModule = true;
var byString_1 = require("./sortables/byString");
exports.byString = byString_1["default"];
var byNumber_1 = require("./sortables/byNumber");
exports.byNumber = byNumber_1["default"];
var byDate_1 = require("./sortables/byDate");
exports.byDate = byDate_1["default"];
var byValue_1 = require("./sortables/byValue");
exports.byValue = byValue_1["default"];
exports["default"] = {
    byString: byString_1["default"],
    byNumber: byNumber_1["default"],
    byDate: byDate_1["default"],
    byValue: byValue_1["default"]
};
