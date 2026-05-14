<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    protected $primaryKey = 'emprunt_id';

    protected $fillable = [
        'heure_emp', 'debut_emp', 'fin_emp', 'livre_id', 'personne_id',
    ];

    public function livre()
    {
        return $this->belongsTo(Livre::class, 'livre_id');
    }

    public function personne()
    {
        return $this->belongsTo(Personne::class, 'personne_id');
    }
}
