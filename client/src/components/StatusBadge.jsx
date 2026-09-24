import React from 'react';
import { STATUS_COLORS } from '../utils/constants';

const StatusBadge = ({ status = 'Applied', size = 'md' }) => {
  const colorConfig = STATUS_COLORS[status] || STATUS_COLORS['Applied'];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${colorConfig.bg} ${colorConfig.text} ${colorConfig.border} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colorConfig.dot}`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;
