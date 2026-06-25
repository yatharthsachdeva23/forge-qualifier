<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Clear existing cards
        DB::table('cards')->truncate();

        // Get or create Main Board
        $boardId = DB::table('boards')->where('id', 1)->value('id');
        if (!$boardId) {
            $boardId = DB::table('boards')->insertGetId([
                'id' => 1,
                'name' => 'Main Board',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Get or create columns
        $columns = [
            ['id' => 1, 'name' => 'To-Do', 'position' => 1],
            ['id' => 2, 'name' => 'Doing', 'position' => 2],
            ['id' => 3, 'name' => 'Done', 'position' => 3],
        ];

        foreach ($columns as $col) {
            $exists = DB::table('lists')->where('id', $col['id'])->exists();
            if (!$exists) {
                DB::table('lists')->insert([
                    'id' => $col['id'],
                    'board_id' => $boardId,
                    'name' => $col['name'],
                    'position' => $col['position'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Insert sample cards
        DB::table('cards')->insert([
            [
                'list_id' => 1,
                'title' => 'Design Landing Page UI',
                'description' => 'Create a high-fidelity design mockup for the main landing page using tailored color palettes.',
                'tag' => 'Design',
                'member_id' => 'Alex',
                'due_date' => now()->addDays(5)->format('Y-m-d'),
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 1,
                'title' => 'Fix Auth Middleware Bug',
                'description' => 'Resolve session token mismatch exception occurring on concurrent API requests.',
                'tag' => 'Bug',
                'member_id' => 'Emma',
                'due_date' => now()->subDays(2)->format('Y-m-d'), // Overdue!
                'position' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 2,
                'title' => 'Integrate Drag-and-Drop Handler',
                'description' => 'Wire up @hello-pangea/dnd context with custom list container sorting references.',
                'tag' => 'Feature',
                'member_id' => 'Liam',
                'due_date' => now()->addDays(1)->format('Y-m-d'),
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'list_id' => 3,
                'title' => 'Setup SQLite Database Schema',
                'description' => 'Initialize migrations for boards, lists, and cards, and configure SQLite connection pathing.',
                'tag' => 'Feature',
                'member_id' => 'Sophia',
                'due_date' => now()->subDays(4)->format('Y-m-d'),
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
