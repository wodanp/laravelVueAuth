<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //TODO get params validieren?
        // if($search = $request->input('search')){
        //     $query = User::search(request($search));
        // }else{
        //     $query = User::query();
        // }

        //https://stackoverflow.com/questions/8519793/php-explode-but-ignore-escaped-delimiter
        //preg_split('~(?<!\\\)' . preg_quote($delimeter, '~') . '~', $text);
        // /(.*?[^\\](\\\\)*?);/

        //TODO request('search')   vs  $request->input('search') ??
        $query = User::query();
        $query->when(request('search'), function($q){
            $q->where('name', 'LIKE', '%'.request('search').'%')
                ->orWhere('email', 'LIKE', '%'.request('search').'%');
        });
        // if($search = $request->input('search')){
        //     $query->where('name', 'LIKE', "%$search%")
        //         ->orWhere('email', 'LIKE', "%$search%");
        // };
        if($order = $request->input('order')){
            $query->orderBy($order['prop'], $order['order']);
        };

        $users = $query->paginate(
            $perPage = $request->input('pageSize', 10), $columns = ['*'], $pageName = 'pageIndex'
        );

        //laravel:scout propblem, pagingund relationen
        // $users = User::search(request('search'))->paginate(
        //     $perPage = (int)$request->input('pageSize', 10), $columns = ['*'], (int)$pageName = 'pageIndex'
        // );

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();
        
        $user->update($data);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(true);
    }
}
