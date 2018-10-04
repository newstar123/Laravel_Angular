<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Validator;

class UserCourse extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_courses';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'university_id', 'course_id', 'user_id'];
    protected $hidden = ['created_at', 'updated_at'];

    public function university() {
        return $this->hasOne('App\Models\University', 'id', 'university_id');
    }
    
    public function user() {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
    public function course() {
        return $this->hasOne('App\Models\Course', 'id', 'course_id');
    }

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    public static function validate($data) {


        $rule = array(
            'university_id' => 'required',
            'course_id' => 'required',
            'user_id' => 'required',
        );

        $messages = array(
            'required' => 'The :attribute field is required.',
        );


        $data = Validator::make($data, $rule, $messages);
        return $data;
    }

}
