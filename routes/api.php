<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\PersonneController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\EmpruntController;

Route::apiResource('matieres',  MatiereController::class);
Route::apiResource('personnes', PersonneController::class);
Route::apiResource('livres',    LivreController::class);
Route::apiResource('lectures',  LectureController::class);
Route::apiResource('emprunts',  EmpruntController::class);
