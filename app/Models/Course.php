<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Validator;

class Course extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'courses';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'university_id', 'description'];
    protected $hidden = ['created_at', 'updated_at'];

    public function university() {
        return $this->hasOne('App\Models\University', 'id', 'university_id');
    }

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    public static function validate($data) {


        $rule = array(
            'name' => 'required|unique:courses',
            'university_id' => 'required',
        );

        $messages = array(
            'required' => 'The :attribute field is required.',
        );


        $data = Validator::make($data, $rule, $messages);
        return $data;
    }

    public static function validateUpdate($data, $id) {

        $rule = array(
            'name' => 'required|unique:courses,name,' . $id . ',id,university_id,' . $data['university_id'],
            'university_id' => 'required',
        );

        $messages = array(
            'required' => 'The :attribute field is required.',
        );

        $data = Validator::make($data, $rule, $messages);
        return $data;
    }

}
