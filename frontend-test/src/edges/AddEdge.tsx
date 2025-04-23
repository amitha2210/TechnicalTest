import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
    Edge,
    EdgeProps,
    Node,
  } from '@xyflow/react';
import { useCallback } from 'react';

interface AddEdgeProps extends EdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    source: string;
    target: string;
}
  
export default function AddEdge({ 
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY,
    source,
    target
  }: AddEdgeProps) {
    const { setEdges, setNodes } = useReactFlow();
    
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const handleAddNode = useCallback(() => {
        console.log("Handle add node called!", { labelX, labelY, source, target });
        const newNodeId = `node_${Date.now()}`;
        
        const newNode: Node = {
          id: newNodeId,
          position: { x: labelX - 75, y: labelY - 20 },
          data: { label: 'Action Node' },
          type: 'default',
        };
        
        setNodes((nodes) => nodes.concat(newNode));
        
        const newEdges: Edge[] = [
          {id: `edge_${source}-${newNodeId}`, source: source, target: newNodeId, type: 'add-edge'},
          {id: `edge_${newNodeId}-${target}`, source: newNodeId, target: target, type: 'add-edge'}
        ];
        
        setEdges((edges) => {
          const filteredEdges = edges.filter((e) => e.id !== id);
          return [...filteredEdges, ...newEdges];
        });
      }, [id, labelX, labelY, setNodes, setEdges, source, target]);
    
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <button
            style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: 'all',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
            }}
            className="nodrag nopan"
            onClick={handleAddNode}
          >
            +
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }