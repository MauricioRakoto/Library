<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // database/migrations/xxxx_create_lectures_table.php

    public function up(): void
    {
        Schema::create('lectures', function (Blueprint $table) {
            $table->integer('lecture_id')->autoIncrement()->primary();
            $table->time('debut_heure');
            $table->time('fin_heure');
            $table->date('date_lect');
            $table->integer('livre_id');    // FK → livres
            $table->integer('personne_id'); // FK → personnes
            $table->foreign('livre_id')->references('livre_id')->on('livres')->onDelete('cascade');
            $table->foreign('personne_id')->references('personne_id')->on('personnes')->onDelete('cascade');
            $table->timestamps();
        });
    }
};
