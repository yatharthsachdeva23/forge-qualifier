import React from 'react';
import { apiService } from '../services/api';

export const moveCard = async (cardId, sourceListId, destListId, board, destIndex) => {
  // 1. Optimistic UI Update
  const updatedBoard = { ...board };
  const sourceList = updatedBoard.lists.find(l => l.id === sourceListId);
  const destList = updatedBoard.lists.find(l => l.id === destListId);
  
  const cardIdx = sourceList.cards.findIndex(c => c.id === cardId);
  const [movedCard] = sourceList.cards.splice(cardIdx, 1);
  
  // Update the list_id on the card object
  movedCard.list_id = destListId;
  destList.cards.splice(destIndex, 0, movedCard);

  return updatedBoard;
};

export const syncCardMovement = async (cardId, destListId) => {
  try {
    await apiService.updateCard(cardId, { list_id: destListId });
  } catch (error) {
    console.error("Backend sync failed for card movement", error);
    throw error;
  }
};
