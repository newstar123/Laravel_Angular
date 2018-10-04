<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use ResponseManager;
use Request;
use Response;
use App\User;
use Hash;

class UserController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $users = User::where('user_type', USER_TYPE_MEMBER)->get()->toArray();
        if (count($users) > 0) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($users, 10, $message));
        } else {
            $message = 'Error';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store() {
        $input = Request::all();
        $input['user_type'] = USER_TYPE_MEMBER;
        $input['active'] = 1;
        $validation = User::validate($input);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        if ($user) {
            $message = 'Added Successfully.';
            return Response()->json(ResponseManager::getResult($user, 10, $message));
        } else {
            $message = 'Something went wrong. Please try again.';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        $user = User::find($id);
        if ($user) {
            $message = 'Success.';
            return Response()->json(ResponseManager::getResult($user, 10, $message));
        } else {
            $message = 'Something went wrong. Please try again.';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        $input = Request::all();
        $validation = User::validateProfile($input, $id);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $user = User::where('id', $id)->update($input);
        if ($user) {
            $message = 'Update Successfully.';
            return Response()->json(ResponseManager::getResult($input, 10, $message));
        } else {
            $message = 'Something went wrong. Please try again.';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id) {
        $delete = User::where('id', $id)->delete();
        if ($delete) {
            $message = 'Detele successfully';
            return Response()->json(ResponseManager::getResult($delete, 10, $message));
        } else {
            $message = 'Error while deleting';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function paginateUser() {
        $input = Request::all();
        $page = ($input['page'] * 1) - 1;
        $limit = $input['limit'] * 1;

        $users = User::where('user_type', USER_TYPE_MEMBER)->take($limit)->skip($page * $limit);
        if ($page == 0) {
            $data['count'] = $users->count();
        }

        $data['list'] = $users->get()->toArray();
        if (count($data['list']) > 0) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($data, 10, $message));
        } else {
            $message = 'No more user found';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function updateActive($id) {
        $input = Request::all();
        $users = User::where('id', $id)->update($input);
        if ($users > 0) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($users, 10, $message));
        } else {
            $message = 'Error';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

}
