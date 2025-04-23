import type { Edge, EdgeTypes } from '@xyflow/react';
import AddEdge from './AddEdge'

export const initialEdges: Edge[] = [
  { id: 'a->b', type: 'add-edge', source: 'a', target: 'b'},
];

export const edgeTypes = {
  // Add your custom edge types here!
  'add-edge': AddEdge,
} satisfies EdgeTypes;
