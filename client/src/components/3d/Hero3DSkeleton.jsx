import React from 'react';

export const Hero3DSkeleton = () => (
  <div className="w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
    <div className="relative flex items-center justify-center">
      <div
        className="w-48 h-48 rounded-full border-2 border-dashed border-blue-400/40 animate-spin"
        style={{ animationDuration: '12s' }}
      ></div>
      <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500/20 via-indigo-500/30 to-purple-500/20 blur-xl animate-pulse"></div>
      <div className="absolute text-xs font-semibold text-blue-500/80 tracking-widest uppercase">
        Loading 3D...
      </div>
    </div>
  </div>
);

export default Hero3DSkeleton;
