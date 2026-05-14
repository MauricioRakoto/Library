<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    protected $primaryKey = 'livre_id';

    protected $fillable = [
        'nom_livre', 'auteur', 'desc', 'date_entre', 'date_sortie', 'matiere_id',
    ];

    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'matiere_id');
    }

    public function lectures()
    {
        return $this->hasMany(Lecture::class, 'livre_id');
    }

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class, 'livre_id');
    }
}
