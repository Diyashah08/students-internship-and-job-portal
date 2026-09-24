import React from 'react';
import { FolderSearch, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon: Icon = FolderSearch,
  title = 'No items found',
  description = 'Try adjusting your search filters or check back later.',
  actionText,
  actionLink,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100 shadow-sm my-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLink && actionText && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          {actionText}
        </Link>
      )}
      {onActionClick && actionText && !actionLink && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
