<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personne extends Model
{
    protected $primaryKey = 'personne_id';

    protected $fillable = [
        'nom_per', 'prenom_per', 'sexe', 'adresse', 'date_birth',
    ];

    public function lectures()
    {
        return $this->hasMany(Lecture::class, 'personne_id');
    }

    public function emprunts()
    {
        return $this->hasMany(Emprunt::class, 'personne_id');
    }
}
