import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
    Edge,
    EdgeProps,
  } from '@xyflow/react';
  
  interface AddEdgeProps extends EdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
  }
  
  export default function AddEdge({ 
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY 
  }: AddEdgeProps) {
    const { setEdges } = useReactFlow();
    
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <button
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          >
            +
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }