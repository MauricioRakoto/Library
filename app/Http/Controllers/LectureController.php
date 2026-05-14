<?php
namespace App\Http\Controllers;

use App\Models\Lecture;
use Illuminate\Http\Request;

class LectureController extends Controller
{
   public function index()
   {
       return response()->json(Lecture::with(['livre', 'personne'])->get()->values(), 200);
   }

    public function store(Request $request)
    {
        $request->validate([
            'debut_heure'  => 'required|date_format:H:i:s',
            'fin_heure'    => 'required|date_format:H:i:s',
            'date_lect'    => 'required|date',
            'livre_id'     => 'required|integer|exists:livres,livre_id',
            'personne_id'  => 'required|integer|exists:personnes,personne_id',
        ]);

        $lecture = Lecture::create($request->all());
        return response()->json($lecture, 201);
    }

    public function show($id)
    {
        $lecture = Lecture::with(['livre', 'personne'])->find($id);
        if (!$lecture) return response()->json(['message' => 'Lecture non trouvée'], 404);
        return response()->json($lecture, 200);
    }

    public function update(Request $request, $id)
    {
        $lecture = Lecture::find($id);
        if (!$lecture) return response()->json(['message' => 'Lecture non trouvée'], 404);

        $request->validate([
            'debut_heure'  => 'required|date_format:H:i:s',
            'fin_heure'    => 'required|date_format:H:i:s',
            'date_lect'    => 'required|date',
            'livre_id'     => 'required|integer|exists:livres,livre_id',
            'personne_id'  => 'required|integer|exists:personnes,personne_id',
        ]);

        $lecture->update($request->all());
        return response()->json($lecture, 200);
    }

    public function destroy($id)
    {
        $lecture = Lecture::find($id);
        if (!$lecture) return response()->json(['message' => 'Lecture non trouvée'], 404);
        $lecture->delete();
        return response()->json(['message' => 'Lecture supprimée'], 200);
    }
}
