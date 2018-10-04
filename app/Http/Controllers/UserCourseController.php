<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use ResponseManager;
use Request;
use Response;
use App\Models\UserCourse;
use Auth;
use Mail;
use Config;

class UserCourseController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $usercourses = UserCourse::with(['university', 'course', 'user']);
        if (Auth::User()->user_type == USER_TYPE_MEMBER) {
            $usercourses = $usercourses->where('user_id', Auth::User()->id);
        }
        $usercourses = $usercourses->get()->toArray();
        if (count($usercourses) > 0) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($usercourses, 10, $message));
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
        if (Auth::User()->user_type == USER_TYPE_MEMBER) {
            $input['user_id'] = Auth::User()->id;
        }
        $validation = UserCourse::validate($input);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $data = Auth::User()->toArray();
        $data['msg'] = 'User ' . $data['name'] . ' with email id ' . $data['email'] . ' has added new cours his/her to profile.';


        $alreadyExist = UserCourse::where('user_id', $input['user_id'])->where('course_id', $input['course_id'])->where('university_id', $input['university_id'])->count();
        if ($alreadyExist) {
            $message = 'Course already added for user.';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }

        $usercourse = UserCourse::create($input);
        if ($usercourse) {
            $data = Auth::User()->toArray();
            $data['msg'] = 'User ' . $data['name'] . ' with email id ' . $data['email'] . ' has add new course his/her to profile.';
            if (Auth::User()->user_type == USER_TYPE_MEMBER) {
                Mail::send('emails.notification', $data, function( $message ) use ($data) {
                    $message->to(ADMIN_EMAIL)->subject('Course added by user');
                });
            }
            $message = 'Added Successfully.';
            return Response()->json(ResponseManager::getResult($usercourse, 10, $message));
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
        $usercourse = UserCourse::find($id);
        if ($usercourse) {
            $message = 'Success.';
            return Response()->json(ResponseManager::getResult($usercourse, 10, $message));
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
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id) {
        $input = Request::all();
        if (Auth::User()->user_type == USER_TYPE_MEMBER) {
            $input['user_id'] = Auth::User()->id;
        }
        $validation = UserCourse::validate($input);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $alreadyExist = UserCourse::where('id', '!=', $id)->where('user_id', $input['user_id'])->where('course_id', $input['course_id'])->where('university_id', $input['university_id'])->count();
        if ($alreadyExist) {
            $message = 'Course already added for user.';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $usercourse = UserCourse::where('id', $id)->update($input);
        if ($usercourse) {
            $data = Auth::User()->toArray();
            $data['msg'] = 'User ' . $data['name'] . ' with email id ' . $data['email'] . ' has update new course his/her to profile.';
            if (Auth::User()->user_type == USER_TYPE_MEMBER) {
                Mail::send('emails.notification', $data, function( $message ) use ($data) {
                    $message->to(ADMIN_EMAIL)->subject('Course update by user');
                });
            }
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
        $delete = UserCourse::where('id', $id)->delete();
        if ($delete) {
            $data = Auth::User()->toArray();
            $data['msg'] = 'User ' . $data['name'] . ' with email id ' . $data['email'] . ' has remove course from his/her to profile.';
            if (Auth::User()->user_type == USER_TYPE_MEMBER) {
                Mail::send('emails.notification', $data, function( $message ) use ($data) {
                    $message->to(ADMIN_EMAIL)->subject('Course remove by user');
                });
            }
            $message = 'Detele successfully';
            return Response()->json(ResponseManager::getResult($delete, 10, $message));
        } else {
            $message = 'Error while deleting';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

}
