<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use ResponseManager;

class Authenticate {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null) {
        if (!Auth::check()) {
            return Response()->json(ResponseManager::getError('', 401, 'You are not authorized to access this. Plese login.'));
        }

        return $next($request);
    }

}
