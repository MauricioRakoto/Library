<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('livres', function (Blueprint $table) {
            $table->integer('livre_id')->autoIncrement()->primary();
            $table->string('nom_livre', 50);
            $table->string('auteur', 50);
            $table->text('desc');
            $table->date('date_entre');
            $table->date('date_sortie');
            $table->integer('matiere_id');
            $table->foreign('matiere_id')->references('matiere_id')->on('matieres')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
