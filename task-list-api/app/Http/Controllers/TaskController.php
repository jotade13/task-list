<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\SaveTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function store(SaveTaskRequest $request)
    {

        $user = auth()->user();

        if (!$user) 
        {
            return response()->json([
                'res' => false,
                'msg' => 'Unauthenticated user'
            ], 401); 
        }

        $user->tasks()->create($request->validated());
        return response()->json([
            'res' => true,
            'msg' => 'Task created successfully'
        ],200);

    }

    public function index(Request $request)
    {
        try {
            $user = auth()->user();

            $tasks = Task::where('user_id', $user->id);

            if ($request->has('search')) {
                $searchTerm = $request->input('search');
                $tasks->where(function ($query) use ($searchTerm) {
                    $query->where('title', 'LIKE', "%$searchTerm%")
                        ->orWhere('description', 'LIKE', "%$searchTerm%");
                });
            }

            if ($request->has('status')) {
                $status = $request->input('status');
                $tasks->where('status', $status);
            }

            $tasks = $tasks->get();

            if ($tasks->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontraron tareas que coincidan con los filtros.',
                    'tasks'    => [],
                ], 200);
            }

            // Retornar la respuesta con los resultados
            return response()->json([
                'success' => true,
                'message' => 'Tareas encontradas exitosamente.',
                'tasks'    => $tasks,
            ], 200);

        } catch (\Exception $e) {
            // Manejar errores inesperados
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al obtener las tareas.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->all());
        return response()->json([
            'res' => true,
            'msg' => 'Task updated successfully'
        ],200);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            'res' => true,
            'msg' => 'Task deleted successfully'
        ],200);
    }


     public function status(Request $request)
    {
        $request->validate([
            'status' => 'required|string|max:255',
        ]);
        $user = auth()->user();

        $searchTerm = $request->input('status');

        echo
        
        $tasks = Task::where('user_id', $user["id"]) 
                     ->where(function ($query) use ($searchTerm) {
                         $query->where('status', 'LIKE', "%{$searchTerm}%");
                     })->get();


        return response()->json([
            'success' => true,
            'data' => $tasks,
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'search' => 'required|string|max:255',
        ]);
        $user = auth()->user();

        $searchTerm = $request->input('search');

        
        $tasks = Task::where('user_id', $user["id"]) 
                     ->where(function ($query) use ($searchTerm) {
                         $query->where('title', 'LIKE', "%$searchTerm%")->orWhere('description', 'LIKE', "%$searchTerm%");
                     })->get();


        return response()->json([
            'success' => true,
            'data' => $tasks,
        ]);
    }
}
