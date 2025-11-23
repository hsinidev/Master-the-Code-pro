import { DeadlockLevel, PipelineLevel } from '../types';

// --- DEADLOCK LEVELS ---
export const DEADLOCK_LEVELS: DeadlockLevel[] = [];
for (let i = 1; i <= 50; i++) {
  const resCount = 2 + Math.floor(i/20);
  const resources = Array.from({length: resCount}, (_, idx) => `R${idx+1}`);
  DEADLOCK_LEVELS.push({
      id: i,
      resources,
      threads: [
          { id: 'T1', instructions: [`LOCK R1`, `WAIT 1`, `LOCK R2`, `UNLOCK R2`, `UNLOCK R1`] },
          { id: 'T2', instructions: [`LOCK R2`, `WAIT 1`, `LOCK R1`, `UNLOCK R1`, `UNLOCK R2`] }
      ],
      goal: i % 2 === 0 ? 'DEADLOCK' : 'SAFE'
  });
}
export const getDeadlockLevel = (id: number) => DEADLOCK_LEVELS[id-1] || DEADLOCK_LEVELS[0];

// --- PIPELINE LEVELS ---
export const PIPELINE_LEVELS: PipelineLevel[] = [];
for (let i = 1; i <= 50; i++) {
    PIPELINE_LEVELS.push({
        id: i,
        stages: ['FETCH', 'DECODE', 'ALU', 'MEM', 'WRITE'],
        incomingData: 10 + i,
        bufferSize: Math.max(2, 10 - Math.floor(i/5)),
        targetThroughput: 50 + i
    });
}
export const getPipelineLevel = (id: number) => PIPELINE_LEVELS[id-1] || PIPELINE_LEVELS[0];
