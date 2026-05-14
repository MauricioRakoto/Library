<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matieres', function (Blueprint $table) {
            $table->integer('matiere_id')->autoIncrement()->primary();
            $table->string('nom_matiere', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matieres');
    }
};
