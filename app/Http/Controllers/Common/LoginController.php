<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Auth;
use ResponseManager;
use Session;
use App\User;
use Mail;
use Request;
use Hash;
use Config;
use JWT;
use GuzzleHttp;

class LoginController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        if (Auth::check()) {
            return view('admin');
        } else {
            return view('login');
        }
    }

    public function logout() {
        Auth::logout();
        Session::flush();
        $message = 'Logout successful';
        return Response()->json(ResponseManager::getResult('', 10, $message));
    }

    public function doLogin() {
        $input = Request::all();

        Auth::attempt(array(
            'email' => $input['email'],
            'password' => $input['password'])
                , true);

        Auth::attempt(array(
            'username' => $input['email'],
            'password' => $input['password'])
                , true);

        if (Auth::check()) {
            $user = Auth::User()->toArray();
            if (!$user['active']) {
                Auth::logout();
                Session::flush();
                $message = 'Your account suspended. Please contact admin.';
                return Response()->json(ResponseManager::getError('', 10, $message));
            }
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($user, 10, $message));
        } else {
            $message = 'Username or password is incorrect';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function logginuser() {
        if (Auth::check()) {
            $user = User::find(Auth::User()->id);
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($user, 10, $message));
        } else {
            $message = 'Please login';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

}
