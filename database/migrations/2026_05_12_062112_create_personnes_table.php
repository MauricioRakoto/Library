<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // database/migrations/xxxx_create_personnes_table.php

    public function up(): void
    {
        Schema::create('personnes', function (Blueprint $table) {
            $table->integer('personne_id')->autoIncrement()->primary();
            $table->string('nom_per', 50);
            $table->string('prenom_per', 50);
            $table->string('sexe', 50);
            $table->string('adresse', 50);
            $table->date('date_birth');
            $table->timestamps();
        });
    }

    public function down(): void
        {
            Schema::dropIfExists('personnes');
        }
};
