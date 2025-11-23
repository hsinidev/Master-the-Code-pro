import { NetLevelConfig } from '../types';

export const NET_LEVELS: NetLevelConfig[] = [];

// 1-10: Basic Subnetting
for (let i = 1; i <= 10; i++) {
  NET_LEVELS.push({
    id: i,
    name: `Subnet Basics ${i}`,
    topology: 'LAN_SIMPLE',
    nodes: [{id: 'PC1', type: 'PC', label: 'Workstation'}, {id: 'PC2', type: 'PC', label: 'Server'}],
    goal: "Make PC1 ping PC2.",
    description: `Configure PC1 to be on the same subnet as PC2 (192.168.1.${10+i}/24).`
  });
}

// 11-20: Routing
for (let i = 11; i <= 20; i++) {
  NET_LEVELS.push({
    id: i,
    name: `Routing Intro ${i}`,
    topology: 'LAN_ROUTED',
    nodes: [
      {id: 'PC1', type: 'PC', label: 'Client A', lockedConfig: {ip: '10.0.0.5', subnet: '255.255.255.0'}}, 
      {id: 'R1', type: 'ROUTER', label: 'Gateway'},
      {id: 'PC2', type: 'PC', label: 'Server B', lockedConfig: {ip: '192.168.1.5', subnet: '255.255.255.0'}}
    ],
    goal: "Configure Gateway and Client A.",
    description: "Set up the default gateway on Client A to reach Server B."
  });
}

// 21-50: Mixed
for (let i = 21; i <= 50; i++) {
  NET_LEVELS.push({
    id: i,
    name: `Adv. Config ${i}`,
    topology: 'WAN',
    nodes: [{id: 'PC1', type: 'PC', label: 'Admin'}, {id: 'R1', type: 'ROUTER', label: 'Core'}],
    goal: "Complex routing scenario.",
    description: "Ensure connectivity across multiple hops."
  });
}

export const getNetLevel = (id: number) => NET_LEVELS.find(l => l.id === id) || NET_LEVELS[0];
