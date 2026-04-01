import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[100]"
    : "flex items-center justify-center py-10";

  return (
    <div className={containerClass}>
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
