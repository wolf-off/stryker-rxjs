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
var PipeChainMutator = /** @class */ (function (_super) {
    __extends(PipeChainMutator, _super);
    function PipeChainMutator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'PipeChain';
        return _this;
    }
    PipeChainMutator.prototype.guard = function (node) {
        return node.kind === ts.SyntaxKind.CallExpression;
    };
    PipeChainMutator.prototype.identifyReplacements = function (fn, sourceFile) {
        if (fn.expression.kind != ts.SyntaxKind.PropertyAccessExpression)
            return [];
        var fnp = fn.expression;
        if (fnp.name.getFullText() != 'pipe')
            return [];
        if (fn.arguments.length < 2)
            return [];
        var mutants = [];
        fn.arguments.forEach(function (argument, index) {
            mutants.push({
                node: fn,
                replacement: sourceFile.text.substring(fn.getStart(), argument.getFullStart() - (index == 0 ? 0 : 1))
                    + sourceFile.text.substring(argument.getEnd() + (index == 0 ? 1 : 0), fn.getEnd())
                // replacement: fn.getFullText() + '/*\n'
                //   + fn.getChildren().length + ' ' + fn.getChildCount() + '\n'
                //   + fn.getStart() + ' ' + argument.getFullStart() + ' ' + argument.getEnd() + ' ' + fn.getEnd() + '\n'
                //   + sourceFile.text.substring(fn.getStart(), argument.getFullStart() - (index == 0 ? 0 : 1))
                //   + sourceFile.text.substring(argument.getEnd() + (index == 0 ? 1 : 0), fn.getEnd())
                //   + '\n*/'
            });
        });
        return mutants;
    };
    return PipeChainMutator;
}(NodeMutator_1["default"]));
exports["default"] = PipeChainMutator;
