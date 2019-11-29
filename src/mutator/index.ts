import FunctionChainMutator from './FunctionChainMutator';
import PipeChainMutator from './PipeChainMutator';
import NodeMutator from './NodeMutator';

export const nodeMutators: readonly NodeMutator[] = [
  new FunctionChainMutator(),
  new PipeChainMutator()
];
