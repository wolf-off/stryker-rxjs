"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ts = require("typescript");
var NodeMutator_1 = require("./NodeMutator");
var FunctionChainMutator = /** @class */ (function (_super) {
    __extends(FunctionChainMutator, _super);
    function FunctionChainMutator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'FunctionChain';
        return _this;
    }
    FunctionChainMutator.prototype.guard = function (node) {
        return node.kind === ts.SyntaxKind.CallExpression;
    };
    FunctionChainMutator.prototype.identifyReplacements = function (fn, sourceFile) {
        if (fn.parent.kind === ts.SyntaxKind.PropertyAccessExpression
            && fn.parent.parent.kind === ts.SyntaxKind.CallExpression
            || fn.expression.kind != ts.SyntaxKind.PropertyAccessExpression)
            return [];
        var mutants = [];
        var removeCall = function (node) {
            if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
                var propertyAccess = node.expression;
                mutants.push({
                    node: fn,
                    replacement: propertyAccess.expression.getFullText() + sourceFile.text.substring(node.getEnd(), fn.getEnd())
                });
                if (propertyAccess.expression.kind === ts.SyntaxKind.CallExpression)
                    removeCall(propertyAccess.expression);
            }
        };
        removeCall(fn);
        return mutants;
    };
    return FunctionChainMutator;
}(NodeMutator_1["default"]));
exports["default"] = FunctionChainMutator;
