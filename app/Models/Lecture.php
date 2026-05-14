<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    protected $primaryKey = 'lecture_id';

    protected $fillable = [
        'debut_heure', 'fin_heure', 'date_lect', 'livre_id', 'personne_id',
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
