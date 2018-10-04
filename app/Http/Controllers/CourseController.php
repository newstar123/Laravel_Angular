<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use ResponseManager;
use Request;
use Response;
use App\Models\Course;

class CourseController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $courses = Course::with('university')->get()->toArray();
        if (count($courses) > 0) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($courses, 10, $message));
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
        $validation = Course::validate($input);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $course = Course::create($input);
        if ($course) {
            $message = 'Added Successfully.';
            return Response()->json(ResponseManager::getResult($course, 10, $message));
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
        $course = Course::find($id);
        if ($course) {
            $message = 'Success.';
            return Response()->json(ResponseManager::getResult($course, 10, $message));
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
        $validation = Course::validateUpdate($input, $id);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $course = Course::where('id', $id)->update($input);
        if ($course) {
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
        $delete = Course::where('id', $id)->delete();
        if ($delete) {
            $message = 'Detele successfully';
            return Response()->json(ResponseManager::getResult($delete, 10, $message));
        } else {
            $message = 'Error while deleting';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

}
