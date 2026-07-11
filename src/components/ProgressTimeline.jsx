import React from 'react';
import { CheckIcon } from './Icons';

export default function ProgressTimeline({ steps = [] }) {
  return (
    <ol className="progress-list">
      {steps.map((step, index) => (
        <li key={`${step.status}-${index}`} className={step.active ? 'done' : 'pending'}>
          <span className="progress-node">{step.active ? <CheckIcon size={17} /> : <span />}</span>
          <span>{step.status}</span>
        </li>
      ))}
    </ol>
  );
}
