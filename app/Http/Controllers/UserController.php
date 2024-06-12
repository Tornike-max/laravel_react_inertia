<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("email")) {
            $query->where("email", "like", "%" . request("email") . "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ? request()->query() : null,
            'success' => session('message') ?? null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/CreateForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $formFieldData = $request->validate([
            'name' => ['required', 'min:3', 'max:30', 'string',],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'confirmed', Password::min(8)->symbols()->letters()],
            'password_confirmation' => ['required', 'string', 'min:8'],
        ]);

        if (empty($formFieldData)) {
            return;
        }

        $formFieldData['email_verified_at'] = time();
        $formFieldData['password'] = bcrypt($formFieldData['password']);

        User::create($formFieldData);

        return to_route('user.index')
            ->with('message', 'User Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }


    public function edit(User $user)
    {
        return inertia('User/EditForm', [
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $formFieldData = $request->validate([
            'name' => ['min:3', 'max:30', 'string',],
            'email' => ['email', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'confirmed', Password::min(8)->symbols()->letters()],
            'password_confirmation' => ['nullable', 'string', 'min:8'],
        ]);

        $formFieldData['email_verified_at'] = time();
        $password = $formFieldData['password'] ?? null;

        if ($password) {
            $formFieldData['password'] = bcrypt($password);
        } else {
            unset($formFieldData['password']);
        }

        $user->update($formFieldData);

        return to_route('user.index')
            ->with('message', 'User Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        to_route('project.index')->with('message', "User: $name Was Deleted");
    }
}
