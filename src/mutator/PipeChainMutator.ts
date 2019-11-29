import * as ts from 'typescript';

import NodeMutator, {NodeReplacement} from './NodeMutator';

export default class PipeChainMutator extends NodeMutator<ts.CallExpression> {
  public name = 'PipeChain';

  public guard(node: ts.Node): node is ts.CallExpression {
    return node.kind === ts.SyntaxKind.CallExpression;
  }

  protected identifyReplacements(fn: ts.CallExpression, sourceFile: any): NodeReplacement[] {
    if (fn.expression.kind != ts.SyntaxKind.PropertyAccessExpression) return [];

    let fnp = fn.expression as ts.PropertyAccessExpression

    if (fnp.name.getFullText() != 'pipe') return [];

    if (fn.arguments.length < 2) return [];

    const mutants = [];

    fn.arguments.forEach((argument, index) => {
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
  }
}
