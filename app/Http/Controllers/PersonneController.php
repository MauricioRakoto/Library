<?php
namespace App\Http\Controllers;

use App\Models\Personne;
use Illuminate\Http\Request;

class PersonneController extends Controller
{
   public function index()
   {
       return response()->json(Personne::all()->values(), 200);
   }

    public function store(Request $request)
    {
        $request->validate([
            'nom_per'    => 'required|string|max:50',
            'prenom_per' => 'required|string|max:50',
            'sexe'       => 'required|string|max:50',
            'adresse'    => 'required|string|max:50',
            'date_birth' => 'required|date',
        ]);

        $personne = Personne::create($request->all());
        return response()->json($personne, 201);
    }

    public function show($id)
    {
        $personne = Personne::find($id);
        if (!$personne) return response()->json(['message' => 'Personne non trouvée'], 404);
        return response()->json($personne, 200);
    }

    public function update(Request $request, $id)
    {
        $personne = Personne::find($id);
        if (!$personne) return response()->json(['message' => 'Personne non trouvée'], 404);

        $request->validate([
            'nom_per'    => 'required|string|max:50',
            'prenom_per' => 'required|string|max:50',
            'sexe'       => 'required|string|max:50',
            'adresse'    => 'required|string|max:50',
            'date_birth' => 'required|date',
        ]);

        $personne->update($request->all());
        return response()->json($personne, 200);
    }

    public function destroy($id)
    {
        $personne = Personne::find($id);
        if (!$personne) return response()->json(['message' => 'Personne non trouvée'], 404);
        $personne->delete();
        return response()->json(['message' => 'Personne supprimée'], 200);
    }
}
