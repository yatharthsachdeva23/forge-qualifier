<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;
use App\Models\BoardList;

class CardController extends Controller
{
    /**
     * Get all boards with their lists and cards.
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'boards' => [
                    [
                        'id' => 1,
                        'name' => 'Main Sprint Board',
                        'lists' => [
                            [
                                'id' => 1,
                                'name' => 'To-Do',
                                'cards' => Card::where('status', 'todo')->get()
                            ],
                            [
                                'id' => 2,
                                'name' => 'Doing',
                                'cards' => Card::where('status', 'doing')->get()
                            ],
                            [
                                'id' => 3,
                                'name' => 'Done',
                                'cards' => Card::where('status', 'done')->get()
                            ]
                        ]
                    ]
                ]
            ]
        ]);
    }

    /**
     * Create a new card.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:todo,doing,done',
            'tag' => 'nullable|string',
            'member' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $card = Card::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Card created successfully',
            'card' => $card
        ], 201);
    }

    /**
     * Update an existing card (or move it to a different list status).
     */
    public function update(Request $request, $id)
    {
        $card = Card::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:todo,doing,done',
            'tag' => 'nullable|string',
            'member' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $card->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Card updated successfully',
            'card' => $card
        ]);
    }

    /**
     * Delete a card.
     */
    public function destroy($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Card deleted successfully'
        ]);
    }
}
