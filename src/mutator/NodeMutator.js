"use strict";
exports.__esModule = true;
var path = require("path");
var NodeMutator = /** @class */ (function () {
    function NodeMutator() {
    }
    NodeMutator.prototype.mutate = function (node, sourceFile) {
        var _this = this;
        return this.identifyReplacements(node, sourceFile).map(function (replacement) { return _this.createMutant(replacement.node, replacement.replacement, sourceFile); });
    };
    NodeMutator.prototype.createMutant = function (original, replacement, sourceFile) {
        return {
            fileName: sourceFile.fileName.replace(/\//g, path.sep),
            mutatorName: this.name,
            range: [original.getStart(sourceFile), original.getEnd()],
            replacement: replacement
        };
    };
    return NodeMutator;
}());
exports["default"] = NodeMutator;
