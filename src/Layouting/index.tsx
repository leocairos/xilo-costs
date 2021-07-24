import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  isNode,
  Elements,
  Connection,
  Edge,
  NodeExtent,
  Position,
  XYPosition
} from 'react-flow-renderer';
import dagre from 'dagre';

//import initialElements from './initial-elements';

import './layouting.css';
const position: XYPosition = { x: 0, y: 0 };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeExtent: NodeExtent = [
  [0, 0],
  [1000, 1000],
];

const initialElements: Elements = [
  {
    id: "0180001",
    data: {
      label: "FRIAVEL - EXTRACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180002",
    data: {
      label: "MAGNESITA + TALCO - EXTRACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102001",
    data: {
      label: "FRIAVEL"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102002",
    data: {
      label: "MAGNESITA + TALCO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180001",
    data: {
      label: "FRIAVEL - EXTRACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180002",
    data: {
      label: "MAGNESITA + TALCO - EXTRACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100035",
    data: {
      label: "MAGNESITA CRUA RM/42"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102010",
    data: {
      label: "MINERIO PRE-CLASSIFICADO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102011",
    data: {
      label: "MINERIO PRE-CLASSIFICADO 02"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102012",
    data: {
      label: "MINERIO PRE-CLASSIFICADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102014",
    data: {
      label: "MINERIO CLASSIFICADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102015",
    data: {
      label: "MINERIO CLASSIFICADO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102016",
    data: {
      label: "MINERIO CLASSIFICADO 02"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102001",
    data: {
      label: "FRIAVEL"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102001",
    data: {
      label: "FRIAVEL"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102002",
    data: {
      label: "MAGNESITA + TALCO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102002",
    data: {
      label: "MAGNESITA + TALCO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102002",
    data: {
      label: "MAGNESITA + TALCO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102010",
    data: {
      label: "MINERIO PRE-CLASSIFICADO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102011",
    data: {
      label: "MINERIO PRE-CLASSIFICADO 02"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102012",
    data: {
      label: "MINERIO PRE-CLASSIFICADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012220",
    data: {
      label: "SH (HIDROSSULFITO DE SODIO SHD.88%)"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012220",
    data: {
      label: "SH (HIDROSSULFITO DE SODIO SHD.88%)"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012220",
    data: {
      label: "SH (HIDROSSULFITO DE SODIO SHD.88%)"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012397",
    data: {
      label: "ACIDO SULFURICO 98%"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012397",
    data: {
      label: "ACIDO SULFURICO 98%"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012397",
    data: {
      label: "ACIDO SULFURICO 98%"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012398",
    data: {
      label: "OLEO DE PINHO CONCENTRACAO 75% (TB C 180 KG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012398",
    data: {
      label: "OLEO DE PINHO CONCENTRACAO 75% (TB C 180 KG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012398",
    data: {
      label: "OLEO DE PINHO CONCENTRACAO 75% (TB C 180 KG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2013968",
    data: {
      label: "KURIFLOCK PN 171 (EMB. DE 25KG)"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2013968",
    data: {
      label: "KURIFLOCK PN 171 (EMB. DE 25KG)"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2013968",
    data: {
      label: "KURIFLOCK PN 171 (EMB. DE 25KG)"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100012",
    data: {
      label: "TALCO FLOTADO TIPO 02"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102014",
    data: {
      label: "MINERIO CLASSIFICADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102015",
    data: {
      label: "MINERIO CLASSIFICADO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102016",
    data: {
      label: "MINERIO CLASSIFICADO 02"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012224",
    data: {
      label: "GAS LIQUEFEITO DE PETROLEO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012224",
    data: {
      label: "GAS LIQUEFEITO DE PETROLEO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012224",
    data: {
      label: "GAS LIQUEFEITO DE PETROLEO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100036",
    data: {
      label: "CONCENTRADO DE MAGNESITA F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100037",
    data: {
      label: "CONCENTRADO DE MAGNESITA 95"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100038",
    data: {
      label: "CONCENTRADO DE MAGNESITA 97"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100042",
    data: {
      label: "MAGNESITA MOIDA M65"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102010",
    data: {
      label: "MINERIO PRE-CLASSIFICADO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102010",
    data: {
      label: "MINERIO PRE-CLASSIFICADO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102012",
    data: {
      label: "MINERIO PRE-CLASSIFICADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0102012",
    data: {
      label: "MINERIO PRE-CLASSIFICADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0912262",
    data: {
      label: "LILAFLOT 20 193L"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0912262",
    data: {
      label: "LILAFLOT 20 193L"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0912262",
    data: {
      label: "LILAFLOT 20 193L"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100028",
    data: {
      label: "MAGNESITA BRITADA 4 A 13 MM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100007",
    data: {
      label: "MAGNESITA CATADA CRUA"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180003",
    data: {
      label: "TALCO 01/E - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180004",
    data: {
      label: "TALCO 01/E GROSSO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180005",
    data: {
      label: "TALCO 01/E L - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180006",
    data: {
      label: "TALCO 01/E M - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180009",
    data: {
      label: "TALCO 01/P - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180010",
    data: {
      label: "TALCO 01/R - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180014",
    data: {
      label: "TALCO USP/200 - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180015",
    data: {
      label: "TALCO USP/325 - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600146",
    data: {
      label: "MAGNESITA CRUA RM/325 - BB 1.500"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100029",
    data: {
      label: "MAGNESITA FINA < 4 MM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180012",
    data: {
      label: "TALCO - XILOSORB - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180019",
    data: {
      label: "TALCO - 20 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180020",
    data: {
      label: "TALCO - 10 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180021",
    data: {
      label: "TALCO - 7 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180035",
    data: {
      label: "TALCO - 20 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180036",
    data: {
      label: "TALCO - 10 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180037",
    data: {
      label: "TALCO - 7 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600090",
    data: {
      label: "TALCO MICROLITE / 10 - C - UMIDO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600097",
    data: {
      label: "TALCO MICROLITE / 7 - C - UMIDO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180020",
    data: {
      label: "TALCO - 10 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180021",
    data: {
      label: "TALCO - 7 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180016",
    data: {
      label: "TALCO - 20 - 10 MICRONS - SECAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180017",
    data: {
      label: "TALCO - 7 - 4 MICRONS - SECAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012224",
    data: {
      label: "GAS LIQUEFEITO DE PETROLEO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "2012224",
    data: {
      label: "GAS LIQUEFEITO DE PETROLEO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180027",
    data: {
      label: "TALCO USP PLUS/200 - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180028",
    data: {
      label: "TALCO USP PLUS/325 - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180029",
    data: {
      label: "TALCO USP PLUS/100 - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180033",
    data: {
      label: "TALCO USP PLUS/7 MICRONS - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600019",
    data: {
      label: "TALCO USP PLUS/100"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180029",
    data: {
      label: "TALCO USP PLUS/100 - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600058",
    data: {
      label: "TALCO USP/ 100"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600001",
    data: {
      label: "TALCO 01/E"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600003",
    data: {
      label: "TALCO 01/E - BB 750"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600004",
    data: {
      label: "TALCO 01/E-GROSSO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600005",
    data: {
      label: "TALCO 01/E-L"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600006",
    data: {
      label: "TALCO 01/E-M - BB 1.350 KG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600015",
    data: {
      label: "TALCO 01/R"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600020",
    data: {
      label: "TALCO USP PLUS/200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600022",
    data: {
      label: "TALCO USP PLUS/325"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600029",
    data: {
      label: "TALCO 01/R G"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600030",
    data: {
      label: "TALCO USP / 7 MICRONS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600040",
    data: {
      label: "TALCO MICROLITE / 20"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600046",
    data: {
      label: "TALCO MICROLITE / 10 - C"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600047",
    data: {
      label: "TALCO MICROLITE / 10 - C - BB 1.350"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600048",
    data: {
      label: "TALCO MICROLITE / 7"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600050",
    data: {
      label: "TALCO MICROLITE / 7 - C"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600056",
    data: {
      label: "TALCO XILOSORB - C - BA"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600058",
    data: {
      label: "TALCO USP/ 100"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600061",
    data: {
      label: "TALCO USP/200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600063",
    data: {
      label: "TALCO USP/325"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600085",
    data: {
      label: "TALCO USP/ 7 MICRONS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600154",
    data: {
      label: "TALCO 01/E - GROSSO  - BB 1.350"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600179",
    data: {
      label: "TALCO 01/E-G"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100001",
    data: {
      label: "TALCO FLOTADO USP"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100002",
    data: {
      label: "TALCO FLOTADO TIPO 01"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100012",
    data: {
      label: "TALCO FLOTADO TIPO 02"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180003",
    data: {
      label: "TALCO 01/E - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180003",
    data: {
      label: "TALCO 01/E - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180003",
    data: {
      label: "TALCO 01/E - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180004",
    data: {
      label: "TALCO 01/E GROSSO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180004",
    data: {
      label: "TALCO 01/E GROSSO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180005",
    data: {
      label: "TALCO 01/E L - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180006",
    data: {
      label: "TALCO 01/E M - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180009",
    data: {
      label: "TALCO 01/P - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180010",
    data: {
      label: "TALCO 01/R - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180010",
    data: {
      label: "TALCO 01/R - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180011",
    data: {
      label: "TALCO - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180012",
    data: {
      label: "TALCO - XILOSORB - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180014",
    data: {
      label: "TALCO USP/200 - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180015",
    data: {
      label: "TALCO USP/325 - MOAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180016",
    data: {
      label: "TALCO - 20 - 10 MICRONS - SECAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180016",
    data: {
      label: "TALCO - 20 - 10 MICRONS - SECAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180017",
    data: {
      label: "TALCO - 7 - 4 MICRONS - SECAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180019",
    data: {
      label: "TALCO - 20 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180021",
    data: {
      label: "TALCO - 7 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180021",
    data: {
      label: "TALCO - 7 MICRONS - MICRONIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180027",
    data: {
      label: "TALCO USP PLUS/200 - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180028",
    data: {
      label: "TALCO USP PLUS/325 - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180033",
    data: {
      label: "TALCO USP PLUS/7 MICRONS - AUTOCLAVAGEM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180035",
    data: {
      label: "TALCO - 20 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180036",
    data: {
      label: "TALCO - 10 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180036",
    data: {
      label: "TALCO - 10 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180037",
    data: {
      label: "TALCO - 7 MICRONS - PELETIZACAO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600061",
    data: {
      label: "TALCO USP/200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600063",
    data: {
      label: "TALCO USP/325"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600085",
    data: {
      label: "TALCO USP/ 7 MICRONS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600090",
    data: {
      label: "TALCO MICROLITE / 10 - C - UMIDO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600090",
    data: {
      label: "TALCO MICROLITE / 10 - C - UMIDO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600097",
    data: {
      label: "TALCO MICROLITE / 7 - C - UMIDO"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100042",
    data: {
      label: "MAGNESITA MOIDA M65"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100028",
    data: {
      label: "MAGNESITA BRITADA 4 A 13 MM"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100040",
    data: {
      label: "OXIDO DE MAGNESIO 95"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100041",
    data: {
      label: "OXIDO DE MAGNESIO 97"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100036",
    data: {
      label: "CONCENTRADO DE MAGNESITA F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100037",
    data: {
      label: "CONCENTRADO DE MAGNESITA 95"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100038",
    data: {
      label: "CONCENTRADO DE MAGNESITA 97"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0722688",
    data: {
      label: "OLEO COMBUSTIVEL TIPO 2B"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0722688",
    data: {
      label: "OLEO COMBUSTIVEL TIPO 2B"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0722688",
    data: {
      label: "OLEO COMBUSTIVEL TIPO 2B"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180042",
    data: {
      label: "XILOMAG MOAGEM M100"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180043",
    data: {
      label: "XILOMAG MOAGEM M200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180044",
    data: {
      label: "XILOMAG MOAGEM M325"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600221",
    data: {
      label: "XILOMAG R M40 - BIG BAG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600189",
    data: {
      label: "XILOMAG 92 M200 - BIG BAG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600192",
    data: {
      label: "XILOMAG 92 M325 - BIG BAG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600204",
    data: {
      label: "XILOMAG 95 M325 - BIG BAG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600205",
    data: {
      label: "XILOMAG 97 M40 – BIG BAG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600220",
    data: {
      label: "XILOMAG R M40 - SACO 25 KG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600222",
    data: {
      label: "XILOMAG R M100 - SACO 25 KG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600239",
    data: {
      label: "XILOMAG F M200 - BIG BAG"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0600257",
    data: {
      label: "MX 97"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-GGF",
    data: {
      label: "GASTOS GERAIS FABRICAO - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "CUSTOS-MO",
    data: {
      label: "MAO DE OBRA - CUSTOS"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100039",
    data: {
      label: "OXIDO DE MAGNESIO F - R - 92"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100040",
    data: {
      label: "OXIDO DE MAGNESIO 95"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100041",
    data: {
      label: "OXIDO DE MAGNESIO 97"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0100041",
    data: {
      label: "OXIDO DE MAGNESIO 97"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180042",
    data: {
      label: "XILOMAG MOAGEM M100"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180043",
    data: {
      label: "XILOMAG MOAGEM M200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180043",
    data: {
      label: "XILOMAG MOAGEM M200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180043",
    data: {
      label: "XILOMAG MOAGEM M200"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180044",
    data: {
      label: "XILOMAG MOAGEM M325"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: "0180044",
    data: {
      label: "XILOMAG MOAGEM M325"
    },
    position: {
      x: 0,
      y: 0
    }
  },
  
  {
    id: "0180001 to 0180001",
    source: "0180001",
    target: "0180001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180002 to 0180002",
    source: "0180002",
    target: "0180002",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102001 to 0102001",
    source: "0102001",
    target: "0102001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102002 to 0102002",
    source: "0102002",
    target: "0102002",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180001 to 0102001",
    source: "0180001",
    target: "0102001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180002 to 0102002",
    source: "0180002",
    target: "0102002",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100035 to 0100035",
    source: "0100035",
    target: "0100035",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102010 to 0102010",
    source: "0102010",
    target: "0102010",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102011 to 0102011",
    source: "0102011",
    target: "0102011",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102012 to 0102012",
    source: "0102012",
    target: "0102012",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102014 to 0102014",
    source: "0102014",
    target: "0102014",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102015 to 0102015",
    source: "0102015",
    target: "0102015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102016 to 0102016",
    source: "0102016",
    target: "0102016",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102001 to 0102011",
    source: "0102001",
    target: "0102011",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102001 to 0102012",
    source: "0102001",
    target: "0102012",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102002 to 0102010",
    source: "0102002",
    target: "0102010",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102002 to 0102011",
    source: "0102002",
    target: "0102011",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102002 to 0102012",
    source: "0102002",
    target: "0102012",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102010 to 0102015",
    source: "0102010",
    target: "0102015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102011 to 0102016",
    source: "0102011",
    target: "0102016",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102012 to 0102014",
    source: "0102012",
    target: "0102014",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0100001",
    source: "0100001",
    target: "0100001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0100002",
    source: "0100002",
    target: "0100002",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100012 to 0100012",
    source: "0100012",
    target: "0100012",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102014 to 0100001",
    source: "0102014",
    target: "0100001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102015 to 0100002",
    source: "0102015",
    target: "0100002",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102016 to 0100012",
    source: "0102016",
    target: "0100012",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100036 to 0100036",
    source: "0100036",
    target: "0100036",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100037 to 0100037",
    source: "0100037",
    target: "0100037",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100038 to 0100038",
    source: "0100038",
    target: "0100038",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100042 to 0100038",
    source: "0100042",
    target: "0100038",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102010 to 0100036",
    source: "0102010",
    target: "0100036",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102010 to 0100037",
    source: "0102010",
    target: "0100037",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102012 to 0100036",
    source: "0102012",
    target: "0100036",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0102012 to 0100037",
    source: "0102012",
    target: "0100037",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100028 to 0100028",
    source: "0100028",
    target: "0100028",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100007 to 0100028",
    source: "0100007",
    target: "0100028",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180003 to 0180003",
    source: "0180003",
    target: "0180003",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180004 to 0180004",
    source: "0180004",
    target: "0180004",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180005 to 0180005",
    source: "0180005",
    target: "0180005",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180006 to 0180006",
    source: "0180006",
    target: "0180006",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180009 to 0180009",
    source: "0180009",
    target: "0180009",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180010 to 0180010",
    source: "0180010",
    target: "0180010",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0180011",
    source: "0180011",
    target: "0180011",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180014 to 0180014",
    source: "0180014",
    target: "0180014",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180015 to 0180015",
    source: "0180015",
    target: "0180015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600146 to 0600146",
    source: "0600146",
    target: "0600146",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100029 to 0600146",
    source: "0100029",
    target: "0600146",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180012 to 0180012",
    source: "0180012",
    target: "0180012",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180019 to 0180019",
    source: "0180019",
    target: "0180019",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180020 to 0180020",
    source: "0180020",
    target: "0180020",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180021 to 0180021",
    source: "0180021",
    target: "0180021",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180035 to 0180035",
    source: "0180035",
    target: "0180035",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180036 to 0180036",
    source: "0180036",
    target: "0180036",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180037 to 0180037",
    source: "0180037",
    target: "0180037",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600090 to 0600090",
    source: "0600090",
    target: "0600090",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600097 to 0600097",
    source: "0600097",
    target: "0600097",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600090",
    source: "0100002",
    target: "0600090",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600097",
    source: "0100002",
    target: "0600097",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0600090",
    source: "0180011",
    target: "0600090",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0600097",
    source: "0180011",
    target: "0600097",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180020 to 0600090",
    source: "0180020",
    target: "0600090",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180021 to 0600097",
    source: "0180021",
    target: "0600097",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180016 to 0180016",
    source: "0180016",
    target: "0180016",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180017 to 0180017",
    source: "0180017",
    target: "0180017",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180027 to 0180027",
    source: "0180027",
    target: "0180027",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180028 to 0180028",
    source: "0180028",
    target: "0180028",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180029 to 0180029",
    source: "0180029",
    target: "0180029",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180033 to 0180033",
    source: "0180033",
    target: "0180033",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600019 to 0600019",
    source: "0600019",
    target: "0600019",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180029 to 0600019",
    source: "0180029",
    target: "0600019",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600058 to 0600019",
    source: "0600058",
    target: "0600019",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600001 to 0600001",
    source: "0600001",
    target: "0600001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600003 to 0600003",
    source: "0600003",
    target: "0600003",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600004 to 0600004",
    source: "0600004",
    target: "0600004",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600005 to 0600005",
    source: "0600005",
    target: "0600005",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600006 to 0600006",
    source: "0600006",
    target: "0600006",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600015 to 0600015",
    source: "0600015",
    target: "0600015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600020 to 0600020",
    source: "0600020",
    target: "0600020",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600022 to 0600022",
    source: "0600022",
    target: "0600022",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600029 to 0600029",
    source: "0600029",
    target: "0600029",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600030 to 0600030",
    source: "0600030",
    target: "0600030",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600040 to 0600040",
    source: "0600040",
    target: "0600040",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600046 to 0600046",
    source: "0600046",
    target: "0600046",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600047 to 0600047",
    source: "0600047",
    target: "0600047",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600048 to 0600048",
    source: "0600048",
    target: "0600048",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600050 to 0600050",
    source: "0600050",
    target: "0600050",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600056 to 0600056",
    source: "0600056",
    target: "0600056",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600058 to 0600058",
    source: "0600058",
    target: "0600058",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600061 to 0600061",
    source: "0600061",
    target: "0600061",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600063 to 0600063",
    source: "0600063",
    target: "0600063",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600085 to 0600085",
    source: "0600085",
    target: "0600085",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600154 to 0600154",
    source: "0600154",
    target: "0600154",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600179 to 0600179",
    source: "0600179",
    target: "0600179",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600001",
    source: "0100001",
    target: "0600001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600015",
    source: "0100001",
    target: "0600015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600029",
    source: "0100001",
    target: "0600029",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600058",
    source: "0100001",
    target: "0600058",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600061",
    source: "0100001",
    target: "0600061",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600063",
    source: "0100001",
    target: "0600063",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100001 to 0600179",
    source: "0100001",
    target: "0600179",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600001",
    source: "0100002",
    target: "0600001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600003",
    source: "0100002",
    target: "0600003",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600004",
    source: "0100002",
    target: "0600004",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600005",
    source: "0100002",
    target: "0600005",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600006",
    source: "0100002",
    target: "0600006",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600015",
    source: "0100002",
    target: "0600015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600040",
    source: "0100002",
    target: "0600040",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600048",
    source: "0100002",
    target: "0600048",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600085",
    source: "0100002",
    target: "0600085",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100002 to 0600154",
    source: "0100002",
    target: "0600154",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100012 to 0600056",
    source: "0100012",
    target: "0600056",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180003 to 0600001",
    source: "0180003",
    target: "0600001",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180003 to 0600003",
    source: "0180003",
    target: "0600003",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180003 to 0600179",
    source: "0180003",
    target: "0600179",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180004 to 0600004",
    source: "0180004",
    target: "0600004",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180004 to 0600154",
    source: "0180004",
    target: "0600154",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180005 to 0600005",
    source: "0180005",
    target: "0600005",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180006 to 0600006",
    source: "0180006",
    target: "0600006",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180009 to 0600058",
    source: "0180009",
    target: "0600058",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180010 to 0600015",
    source: "0180010",
    target: "0600015",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180010 to 0600029",
    source: "0180010",
    target: "0600029",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0600040",
    source: "0180011",
    target: "0600040",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0600048",
    source: "0180011",
    target: "0600048",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0600056",
    source: "0180011",
    target: "0600056",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180011 to 0600085",
    source: "0180011",
    target: "0600085",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180012 to 0600056",
    source: "0180012",
    target: "0600056",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180014 to 0600061",
    source: "0180014",
    target: "0600061",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180015 to 0600063",
    source: "0180015",
    target: "0600063",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180016 to 0600046",
    source: "0180016",
    target: "0600046",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180016 to 0600047",
    source: "0180016",
    target: "0600047",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180017 to 0600050",
    source: "0180017",
    target: "0600050",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180019 to 0600040",
    source: "0180019",
    target: "0600040",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180021 to 0600048",
    source: "0180021",
    target: "0600048",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180021 to 0600085",
    source: "0180021",
    target: "0600085",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180027 to 0600020",
    source: "0180027",
    target: "0600020",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180028 to 0600022",
    source: "0180028",
    target: "0600022",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180033 to 0600030",
    source: "0180033",
    target: "0600030",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180035 to 0600056",
    source: "0180035",
    target: "0600056",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180036 to 0600046",
    source: "0180036",
    target: "0600046",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180036 to 0600047",
    source: "0180036",
    target: "0600047",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180037 to 0600050",
    source: "0180037",
    target: "0600050",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600061 to 0600020",
    source: "0600061",
    target: "0600020",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600063 to 0600022",
    source: "0600063",
    target: "0600022",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600085 to 0600030",
    source: "0600085",
    target: "0600030",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600090 to 0600046",
    source: "0600090",
    target: "0600046",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600090 to 0600047",
    source: "0600090",
    target: "0600047",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600097 to 0600050",
    source: "0600097",
    target: "0600050",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100042 to 0100042",
    source: "0100042",
    target: "0100042",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100028 to 0100042",
    source: "0100028",
    target: "0100042",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0100039",
    source: "0100039",
    target: "0100039",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100040 to 0100040",
    source: "0100040",
    target: "0100040",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100041 to 0100041",
    source: "0100041",
    target: "0100041",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100036 to 0100039",
    source: "0100036",
    target: "0100039",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100037 to 0100040",
    source: "0100037",
    target: "0100040",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100038 to 0100041",
    source: "0100038",
    target: "0100041",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180042 to 0180042",
    source: "0180042",
    target: "0180042",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180043 to 0180043",
    source: "0180043",
    target: "0180043",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180044 to 0180044",
    source: "0180044",
    target: "0180044",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600221 to 0600221",
    source: "0600221",
    target: "0600221",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0600221",
    source: "0100039",
    target: "0600221",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600189 to 0600189",
    source: "0600189",
    target: "0600189",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600192 to 0600192",
    source: "0600192",
    target: "0600192",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600204 to 0600204",
    source: "0600204",
    target: "0600204",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600205 to 0600205",
    source: "0600205",
    target: "0600205",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600220 to 0600220",
    source: "0600220",
    target: "0600220",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600222 to 0600222",
    source: "0600222",
    target: "0600222",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600239 to 0600239",
    source: "0600239",
    target: "0600239",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0600257 to 0600257",
    source: "0600257",
    target: "0600257",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0600189",
    source: "0100039",
    target: "0600189",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0600192",
    source: "0100039",
    target: "0600192",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0600220",
    source: "0100039",
    target: "0600220",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0600222",
    source: "0100039",
    target: "0600222",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100039 to 0600239",
    source: "0100039",
    target: "0600239",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100040 to 0600204",
    source: "0100040",
    target: "0600204",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100041 to 0600205",
    source: "0100041",
    target: "0600205",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0100041 to 0600257",
    source: "0100041",
    target: "0600257",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180042 to 0600222",
    source: "0180042",
    target: "0600222",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180043 to 0600189",
    source: "0180043",
    target: "0600189",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180043 to 0600239",
    source: "0180043",
    target: "0600239",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180043 to 0600257",
    source: "0180043",
    target: "0600257",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180044 to 0600192",
    source: "0180044",
    target: "0600192",
    animated: true,
    type: "smoothstep"
  },
  {
    id: "0180044 to 0600204",
    source: "0180044",
    target: "0600204",
    animated: true,
    type: "smoothstep"
  }
];

const LayoutFlow = () => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));

  const onLayout = (direction: string) => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: 250, height: 150 });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    const layoutedElements = elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? Position.Left : Position.Top;
        el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
        // we need to pass a slighltiy different position in order to notify react flow about the change
        // @TODO how can we change the position handling so that we dont need this hack?
        el.position = { x: nodeWithPosition.x + Math.random() / 1000, y: nodeWithPosition.y };
      }

      return el;
    });

    setElements(layoutedElements);
  };

  return (
    <div className="layoutflow">
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          nodeExtent={nodeExtent}
          onLoad={() => onLayout('TB')}
        >
          <Controls />
        </ReactFlow>
        <div className="controls">
          <button onClick={() => onLayout('TB')} style={{ marginRight: 10 }}>
            vertical layout
          </button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
