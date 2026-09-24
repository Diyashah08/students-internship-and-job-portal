import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ message = 'Loading...', size = 'default' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <Loader2
        className={`text-blue-600 animate-spin ${
          size === 'small' ? 'w-5 h-5' : size === 'large' ? 'w-10 h-10' : 'w-8 h-8'
        }`}
      />
      {message && <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">Loading InternConnect...</p>
    </div>
  );
};

export default Loader;
