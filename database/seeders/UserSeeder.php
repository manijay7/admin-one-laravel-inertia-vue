<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/database/json/staff.json';
        $users = json_decode(file_get_contents($path));

        foreach ($users as $user) {
            User::create([
                "first_name" => $user->first_name,
                "last_name" => $user->last_name,
                "email" => $user->email,
                'phone' => '',
                "password" => bcrypt($user->password),
                "is_default_password" => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}