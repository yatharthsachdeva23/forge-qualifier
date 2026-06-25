<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class KanbanController extends Controller
{
    public function getBoard()
    {
        // For this MVP, we return the first board with its lists and cards
        $board = Board::with('lists.cards')->first();
        
        if (!$board) {
            return response()->json(['error' => 'No board found'], 404);
        }

        return response()->json($board);
    }

    public function storeCard(Request $request)
    {
        $validated = $request->validate([
            'list_id' => 'required|exists:lists,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'tag' => 'nullable|string',
            'member_id' => 'nullable|string',
            'due_date' => 'nullable|date',
            'position' => 'integer'
        ]);

        $card = Card::create($validated);
        return response()->json($card, 201);
    }

    public function updateCard(Request $request, $id)
    {
        $card = Card::findOrFail($id);
        $card->update($request->all());
        return response()->json($card);
    }
}
