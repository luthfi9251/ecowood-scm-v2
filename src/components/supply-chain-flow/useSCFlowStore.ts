'use client';
import { Edge, NodeTypes, Position } from '@xyflow/react';
import { create } from 'zustand';

export type NodeInformationType = {
   id: string;
   company_name: string;
   company_picture: string;
   outcome_material: string;
};

export type NodeFlowType = {
   id: string;
   type: string;
   position: {
      x: number;
      y: number;
   };
   targetPosition?: Position;
   data: NodeInformationType;
};

interface FlowStoreState {
   nodes: NodeFlowType[];
   edges: Edge[];
   addNodes: (node: NodeFlowType) => void;
   setNodes: (node: any[]) => void;
}

export const useSCFlowStore = create<FlowStoreState>()((set) => ({
   nodes: [
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
         position: { x: 200, y: 300 },
         data: {
            company_name: 'PT. Pelletcore',
            company_picture: 'https://picsum.photos/100',
            id: '3',
            outcome_material: 'Wood Pellet',
         },
      },
   ],
   edges: [
      {
         id: 'edge-1',
         source: 'node-1',
         target: 'node-2',
         sourceHandle: 'a',
         animated: true,
         deletable: false,
      },
   ],
   addNodes: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
   setNodes: (nodes) => set((state) => ({ nodes: nodes })),
}));
