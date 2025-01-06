'use client';
import { useCallback, useState } from 'react';
import {
   Background,
   BackgroundVariant,
   Controls,
   Edge,
   EdgeProps,
   Node,
   NodeChange,
   Position,
   ReactFlow,
   addEdge,
   applyEdgeChanges,
   applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';
import {
   CompanyHilirNodes,
   CompanyHuluNodes,
   CompanyMidNodes,
} from './CompanyNodes';
import { NodeFlowType, useSCFlowStore } from './useSCFlowStore';

const initialNodes: NodeFlowType[] = [
   {
      id: 'node-1',
      type: 'companyNodeHulu',
      position: { x: 0, y: 0 },
      data: {
         company_name: 'PT. Maju Mundur Bersama',
         company_picture: 'https://picsum.photos/100',
         id: '1',
         outcome_material: 'Wood Logs',
      },
   },
   {
      id: 'node-2',
      type: 'companyNodeMid',
      targetPosition: Position.Top,
      position: { x: 0, y: 200 },
      data: {
         company_name: 'PT. Furniture Berkarya',
         company_picture: 'https://picsum.photos/100',
         id: '2',
         outcome_material: 'Wood Waste',
      },
   },
   {
      id: 'node-3',
      type: 'companyNodeHilir',
      targetPosition: Position.Top,
      position: { x: 200, y: 400 },
      data: {
         company_name: 'PT. Pelletcore',
         company_picture: 'https://picsum.photos/100',
         id: '3',
         outcome_material: 'Wood Pellet',
      },
   },
];

const initialEdges: Edge[] = [
   {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      sourceHandle: 'a',
      animated: true,
      deletable: false,
   },
];

const nodeTypes = {
   companyNodeMid: CompanyMidNodes,
   companyNodeHulu: CompanyHuluNodes,
   companyNodeHilir: CompanyHilirNodes,
};

export default function Flow({ className }: { className?: string }) {
   // const nodes = useSCFlowStore((state) => state.nodes);
   // const edges = useSCFlowStore((state) => state.edges);

   const [nodes, setNodes] = useState(initialNodes);
   const [edges, setEdges] = useState(initialEdges);
   const onNodesChange = useCallback(
      (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
      []
   );
   const onEdgesChange = useCallback(
      (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
      []
   );

   return (
      <ReactFlow
         nodes={nodes}
         edges={edges}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         nodeTypes={nodeTypes}
         fitView
         className={cn(className)}
      >
         <Background color="#ccc" variant={BackgroundVariant.Dots} />
         <Controls />
      </ReactFlow>
   );
}
