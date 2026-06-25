<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Card extends Model
{
    protected $fillable = ['list_id', 'title', 'description', 'tag', 'member_id', 'due_date', 'position'];

    public function list(): BelongsTo
    {
        return $this->belongsTo(KanbanList::class, 'list_id');
    }
}
