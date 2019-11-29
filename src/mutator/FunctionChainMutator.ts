import * as ts from 'typescript';

import NodeMutator, {NodeReplacement} from './NodeMutator';

export default class FunctionChainMutator extends NodeMutator<ts.CallExpression> {
  public name = 'FunctionChain';

  public guard(node: ts.Node): node is ts.CallExpression {
    return node.kind === ts.SyntaxKind.CallExpression;
  }

  protected identifyReplacements(fn: ts.CallExpression, sourceFile: any): NodeReplacement[] {
    if (fn.parent.kind === ts.SyntaxKind.PropertyAccessExpression
      && fn.parent.parent.kind === ts.SyntaxKind.CallExpression
      || fn.expression.kind != ts.SyntaxKind.PropertyAccessExpression)
      return [];

    const mutants = [];

    const removeCall = (node: ts.CallExpression) => {
      if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
        let propertyAccess = node.expression as ts.PropertyAccessExpression;
        mutants.push({
          node: fn,
          replacement: propertyAccess.expression.getFullText() + sourceFile.text.substring(node.getEnd(), fn.getEnd())
        });
        if (propertyAccess.expression.kind === ts.SyntaxKind.CallExpression)
          removeCall(propertyAccess.expression as ts.CallExpression);
      }
    }
    removeCall(fn);

    return mutants;
  }
}
