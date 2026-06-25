const TAG_COLORS = {
  Bug: 'bg-red-100 text-red-800 border-red-200',
  Design: 'bg-blue-100 text-blue-800 border-blue-200',
  Feature: 'bg-green-100 text-green-800 border-green-200',
  Other: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const getTagStyle = (tag) => TAG_COLORS[tag] || TAG_COLORS.Other;

export const isOverdue = (dueDate, listName) => {
  if (!dueDate || listName === 'Done') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return due < today;
};
