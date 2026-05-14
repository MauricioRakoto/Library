<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    protected $primaryKey = 'matiere_id';

    protected $fillable = [
        'nom_matiere',
    ];
}
