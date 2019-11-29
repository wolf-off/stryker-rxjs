"use strict";
exports.__esModule = true;
var FunctionChainMutator_1 = require("./FunctionChainMutator");
var PipeChainMutator_1 = require("./PipeChainMutator");
exports.nodeMutators = [
    new FunctionChainMutator_1["default"](),
    new PipeChainMutator_1["default"]()
];
