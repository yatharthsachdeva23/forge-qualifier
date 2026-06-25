import React from 'react';
import { getTagStyle, isOverdue } from '../utils/kanbanUtils';

const Card = ({ card, listName }) => {
  const tagStyle = getTagStyle(card.tag);
  const overdue = isOverdue(card.due_date, listName);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative group">
      {overdue && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
          Overdue
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tagStyle}`}>
          {card.tag || 'Other'}
        </span>
        <div className="w-6 h-6 rounded-full bg-gray-300 border border-white overflow-hidden">
           <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${card.member_id}`} 
            alt="avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{card.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">{card.description || 'No description provided.'}</p>
      
      <div className="flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M12 21h.01m0 0h-1M12 21V5M5 12h14m-14 0a2 2 0 100 4h14a2 2 0 100-4M5 12V7m14 5V7" /></svg>
          {card.due_date || 'No date'}
        </div>
      </div>
    </div>
  );
};

export default Card;
