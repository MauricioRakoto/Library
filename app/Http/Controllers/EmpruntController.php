<?php
namespace App\Http\Controllers;

use App\Models\Emprunt;
use Illuminate\Http\Request;

class EmpruntController extends Controller
{
    public function index()
    {
        return response()->json(Emprunt::with(['livre', 'personne'])->get()->values(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'heure_emp'   => 'required|date_format:H:i:s',
            'debut_emp'   => 'required|date',
            'fin_emp'     => 'required|date|after_or_equal:debut_emp',
            'livre_id'    => 'required|integer|exists:livres,livre_id',
            'personne_id' => 'required|integer|exists:personnes,personne_id',
        ]);

        $emprunt = Emprunt::create($request->all());
        return response()->json($emprunt, 201);
    }

    public function show($id)
    {
        $emprunt = Emprunt::with(['livre', 'personne'])->find($id);
        if (!$emprunt) return response()->json(['message' => 'Emprunt non trouvé'], 404);
        return response()->json($emprunt, 200);
    }

    public function update(Request $request, $id)
    {
        $emprunt = Emprunt::find($id);
        if (!$emprunt) return response()->json(['message' => 'Emprunt non trouvé'], 404);

        $request->validate([
            'heure_emp'   => 'required|date_format:H:i:s',
            'debut_emp'   => 'required|date',
            'fin_emp'     => 'required|date|after_or_equal:debut_emp',
            'livre_id'    => 'required|integer|exists:livres,livre_id',
            'personne_id' => 'required|integer|exists:personnes,personne_id',
        ]);

        $emprunt->update($request->all());
        return response()->json($emprunt, 200);
    }

    public function destroy($id)
    {
        $emprunt = Emprunt::find($id);
        if (!$emprunt) return response()->json(['message' => 'Emprunt non trouvé'], 404);
        $emprunt->delete();
        return response()->json(['message' => 'Emprunt supprimé'], 200);
    }
}
