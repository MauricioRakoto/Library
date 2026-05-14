<?php
namespace App\Http\Controllers;

use App\Models\Livre;
use Illuminate\Http\Request;

class LivreController extends Controller
{
   public function index()
   {
       return response()->json(Livre::with('matiere')->get()->values(), 200);
   }

    public function store(Request $request)
    {
        $request->validate([
            'nom_livre'   => 'required|string|max:50',
            'auteur'      => 'required|string|max:50',
            'desc'        => 'required|string',
            'date_entre'  => 'required|date',
            'date_sortie' => 'required|date',
            'matiere_id'  => 'required|integer|exists:matieres,matiere_id',
        ]);

        $livre = Livre::create($request->all());
        return response()->json($livre, 201);
    }

    public function show($id)
    {
        $livre = Livre::with('matiere')->find($id);
        if (!$livre) return response()->json(['message' => 'Livre non trouvé'], 404);
        return response()->json($livre, 200);
    }

    public function update(Request $request, $id)
    {
        $livre = Livre::find($id);
        if (!$livre) return response()->json(['message' => 'Livre non trouvé'], 404);

        $request->validate([
            'nom_livre'   => 'required|string|max:50',
            'auteur'      => 'required|string|max:50',
            'desc'        => 'required|string',
            'date_entre'  => 'required|date',
            'date_sortie' => 'required|date',
            'matiere_id'  => 'required|integer|exists:matieres,matiere_id',
        ]);

        $livre->update($request->all());
        return response()->json($livre, 200);
    }

    public function destroy($id)
    {
        $livre = Livre::find($id);
        if (!$livre) return response()->json(['message' => 'Livre non trouvé'], 404);
        $livre->delete();
        return response()->json(['message' => 'Livre supprimé'], 200);
    }
}
