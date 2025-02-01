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

    public function index()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'res' => false,
                'msg' => 'Unauthenticated User'
            ], 401); 
        }

        $tasks = $user->tasks;

        return response()->json([
            'res' => true,
            'tasks' => $tasks
        ], 200); 
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
}
