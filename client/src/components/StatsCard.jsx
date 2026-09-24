import React from 'react';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  subtitle,
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className="text-3xl font-extrabold text-slate-900 mt-2">{value}</h4>
        </div>
        {Icon && (
          <div className={`p-3.5 rounded-2xl ${scheme.bg} ${scheme.text}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {(subtitle || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {trend && (
            <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              {trend}
            </span>
          )}
          {subtitle && <span className="text-slate-400">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
