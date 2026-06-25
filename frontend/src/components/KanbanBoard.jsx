import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { apiService } from '../services/api';
import { moveCard, syncCardMovement } from '../utils/dndUtils';
import Card from './Card';

const KanbanBoard = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    title: '', description: '', tag: 'Feature', member_id: 'Guest', due_date: ''
  });

  useEffect(() => {
    async function loadBoard() {
      try {
        const data = await apiService.getBoard();
        setBoard(data);
      } catch (e) {
        console.error("Fatal error loading board", e);
      } finally {
        setLoading(false);
      }
    }
    loadBoard();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceListId = parseInt(source.droppableId);
    const destListId = parseInt(destination.droppableId);
    const cardId = parseInt(board.lists.find(l => l.id === sourceListId).cards[source.index].id);

    // --- OPTIMISTIC UPDATE ---
    const previousBoardState = JSON.parse(JSON.stringify(board));
    const updatedBoard = await moveCard(cardId, sourceListId, destListId, board, destination.index);
    setBoard(updatedBoard);

    try {
      // --- ASYNC BACKEND SYNC ---
      await syncCardMovement(cardId, destListId);
    } catch (err) {
      console.error("Sync failed. Reverting card position...");
      setBoard(previousBoardState);
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    const todoList = board.lists.find(l => l.name === 'To-Do');
    if (!todoList) return;

    const cardPayload = { ...newCard, list_id: todoList.id, position: board.lists[0].cards.length };
    
    const updatedBoard = { ...board };
    const newCardObj = { ...cardPayload, id: Date.now() };
    updatedBoard.lists[0].cards.push(newCardObj);
    setBoard(updatedBoard);
    setIsModalOpen(false);
    setNewCard({ title: '', description: '', tag: 'Feature', member_id: 'Guest', due_date: '' });

    try {
      await apiService.createCard(cardPayload); 
    } catch (err) {
      console.error("Failed to sync new card with backend");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-xl font-bold">Loading Kanban Board...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">{board?.name || 'Kanban Board'}</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
        >
          + Add Card
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-8 max-w-7xl mx-auto">
          {board?.lists?.map(list => (
            <div key={list.id} className={`rounded-xl w-80 flex-shrink-0 p-4 ${
              list.name === 'To-Do' ? 'bg-gray-200/50' : 
              list.name === 'Doing' ? 'bg-blue-100/50' : 'bg-green-100/50'
            }`}>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider">{list.name}</h2>
                <span className="bg-white px-2 py-0.5 rounded text-xs font-bold text-slate-500 shadow-sm">
                  {list.cards?.length || 0}
                </span>
              </div>
              
              <Droppable droppableId={list.id.toString()}>
                {(provided) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className="space-y-4 min-h-[500px]"
                  >
                    {list.cards?.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                          >
                            <Card card={card} listName={list.name} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Card</h2>
            <form onSubmit={handleAddCard} className="space-y-4">
              <input 
                className="w-full p-2 border rounded-lg" 
                placeholder="Title" 
                required 
                onChange={e => setNewCard({...newCard, title: e.target.value})} 
              />
              <textarea 
                className="w-full p-2 border rounded-lg" 
                placeholder="Description" 
                onChange={e => setNewCard({...newCard, description: e.target.value})} 
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="p-2 border rounded-lg" 
                  onChange={e => setNewCard({...newCard, tag: e.target.value})}
                >
                  <option value="Feature">Feature</option>
                  <option value="Bug">Bug</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
                <input 
                  type="date" 
                  className="p-2 border rounded-lg" 
                  onChange={e => setNewCard({...newCard, due_date: e.target.value})} 
                />
              </div>
              <input 
                className="w-full p-2 border rounded-lg" 
                placeholder="Member ID (e.g. John)" 
                onChange={e => setNewCard({...newCard, member_id: e.target.value})} 
              />
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">Create Card</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
