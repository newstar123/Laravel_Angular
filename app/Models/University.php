<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Validator;

class University extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'universities';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'name', 'description'];
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    public static function validate($data) {


        $rule = array(
            'name' => 'required|unique:universities',
        );

        $messages = array(
            'required' => 'The :attribute field is required.',
        );


        $data = Validator::make($data, $rule, $messages);
        return $data;
    }

    public static function validateUpdate($data, $id) {

        $rule = array(
            'name' => 'sometimes|required|unique:universities,name,' . $id . ',id',
        );

        $messages = array(
            'required' => 'The :attribute field is required.',
        );

        $data = Validator::make($data, $rule, $messages);
        return $data;
    }

}
