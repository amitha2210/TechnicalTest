import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onNodeClick = (event: any, node: any) => {
    setSelectedNode(node);
  };

  const handleNodeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedNode = { ...selectedNode, data: { label: event.target.value } };
    setSelectedNode(updatedNode);
    setNodes((nodes) =>
      nodes.map((node) => (node.id === selectedNode.id ? updatedNode : node))
    );
  };

  const handleDeleteNode = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode.id));
    setSelectedNode(null);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {selectedNode && (
        <div className="node-edit-form" style={{ 
          position: 'fixed', 
          right: 0, 
          top: 0,
          width: '50vw',
          height: '100vh',
          padding: '20px',
          backgroundColor: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }}>
          <h3>Action</h3>
          <label>
            Action Name
            <input
              type="text"
              value={selectedNode.data.label}
              onChange={handleNodeNameChange}
              style={{ 
                display: 'block', 
                marginTop: '8px', 
                marginBottom: '640px',
                width: '100%',
                height: '30px',
                borderRadius: '7px' 
              }}
            />
          </label>
          <button onClick={handleDeleteNode} style={{ 
            backgroundColor: '#fadbd8', 
            color: 'red',
            borderColor: 'red',
            borderRadius: '5px',
            width: '100px',
            height: '30px'
          }}>
            Delete
          </button>
          <button onClick={() => setSelectedNode(null)} style={{ 
            backgroundColor:'#673ab7', 
            color: 'white',
            borderRadius: '5px',
            marginLeft: '160px',
            width: '100px',
            height: '30px'
          }}>
            Save
          </button>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={onNodeClick}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
