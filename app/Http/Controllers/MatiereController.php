<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use Illuminate\Http\Request;

class MatiereController extends Controller
{
    // GET /api/matieres
   public function index()
   {
       return response()->json(Matiere::all()->values(), 200);
   }

    // POST /api/matieres
    public function store(Request $request)
    {
        $request->validate([
            'nom_matiere' => 'required|string|max:50',
        ]);

        $matiere = Matiere::create($request->all());
        return response()->json($matiere, 201);
    }

    // GET /api/matieres/{id}
    public function show($id)
    {
        $matiere = Matiere::find($id);

        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        return response()->json($matiere, 200);
    }

    // PUT /api/matieres/{id}
    public function update(Request $request, $id)
    {
        $matiere = Matiere::find($id);

        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        $request->validate([
            'nom_matiere' => 'required|string|max:50',
        ]);

        $matiere->update($request->all());
        return response()->json($matiere, 200);
    }

    // DELETE /api/matieres/{id}
    public function destroy($id)
    {
        $matiere = Matiere::find($id);

        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        $matiere->delete();
        return response()->json(['message' => 'Matière supprimée'], 200);
    }
}
