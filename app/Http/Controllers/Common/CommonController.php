<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use ResponseManager;
use Hash;
use App\User;
use Auth;
use Request;

class CommonController extends Controller {

    public function __construct() {
        $this->middleware('auth', ['except' => ['dbSetup']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function dbSetup() {
        $input = [];
        $input['name'] = 'Rejeb Zorgani';
        $input['username'] = 'admin';
        $input['password'] = Hash::make('123');
        $input['email'] = 'admin@gmail.com';
        $input['user_type'] = USER_TYPE_ADMIN;

        $exist = User::where('email', $input['email'])->count();

        if ($exist) {
            $message = 'Admin already exist';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }

        $user = User::create($input);
        if ($user) {
            $message = 'Admin Created successfully';
            return Response()->json(ResponseManager::getResult($user, 10, $message));
        } else {
            $message = 'Error while creating admin, Try again';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function profile() {
        if (Auth::check()) {
            $user = Auth::User()->toArray();
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($user, 10, $message));
        } else {
            $message = 'Error';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function updatePassword() {
        $input = Request::all();

        $data['password'] = Hash::make($input['password']);
        $user = User::find(Auth::User()->id);
        if (Hash::check($input['current'], $user->password)) {
            $user = User::where('id', Auth::User()->id)->update($data);
            if ($user) {
                $message = 'Your password has been changed successfully';
                return Response()->json(ResponseManager::getResult($user, 10, $message));
            } else {
                $message = 'Error in changing password';
                return Response()->json(ResponseManager::getError('', 10, $message));
            }
        } else {
            $message = 'Your current password is invalid';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function updateProfile() {
        $input = Request::all();
        $id = Auth::User()->id;
        $validation = User::validateProfile($input, $id);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }

        $user = User::where('id', $id)->update($input);
        if ($user) {
            $message = 'User profile successfully updated';
            return Response()->json(ResponseManager::getResult($input, 10, $message));
        } else {
            $message = 'Error in  updating user profile';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

}
