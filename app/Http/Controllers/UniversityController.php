<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use ResponseManager;
use Request;
use Response;
use App\Models\University;
use App\Models\Course;

class UniversityController extends Controller {

    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        $universities = University::get()->toArray();
        if (count($universities) > 0) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($universities, 10, $message));
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
        $validation = University::validate($input);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $university = University::create($input);
        if ($university) {
            $message = 'Added Successfully.';
            return Response()->json(ResponseManager::getResult($university, 10, $message));
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
        $university = University::find($id);
        if ($university) {
            $message = 'Success.';
            return Response()->json(ResponseManager::getResult($university, 10, $message));
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
        $validation = University::validateUpdate($input, $id);
        if ($validation->fails()) {
            $message = $validation->messages()->first();
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $university = University::where('id', $id)->update($input);
        if ($university) {
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
        $existCourse = Course::where('university_id', $id)->count();
        if ($existCourse) {
            $message = 'Course added for university, Delete it first';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
        $delete = University::where('id', $id)->delete();
        if ($delete) {
            $message = 'Detele successfully';
            return Response()->json(ResponseManager::getResult($delete, 10, $message));
        } else {
            $message = 'Error while deleting';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

    public function universityCourses($uni_id) {
        $courses = Course::where('university_id',$uni_id)->get()->toArray();
        if ($courses) {
            $message = 'Success';
            return Response()->json(ResponseManager::getResult($courses, 10, $message));
        } else {
            $message = 'No Course added';
            return Response()->json(ResponseManager::getError('', 10, $message));
        }
    }

}
