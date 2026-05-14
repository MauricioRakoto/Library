<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   // database/migrations/xxxx_create_emprunts_table.php

   public function up(): void
   {
       Schema::create('emprunts', function (Blueprint $table) {
           $table->integer('emprunt_id')->autoIncrement()->primary();
           $table->time('heure_emp');
           $table->date('debut_emp');
           $table->date('fin_emp');
           $table->integer('livre_id');    // FK → livres
           $table->integer('personne_id'); // FK → personnes
           $table->foreign('livre_id')->references('livre_id')->on('livres')->onDelete('cascade');
           $table->foreign('personne_id')->references('personne_id')->on('personnes')->onDelete('cascade');
           $table->timestamps();
       });
   }

   public function down(): void
       {
           Schema::dropIfExists('emprunts');
       }
};
