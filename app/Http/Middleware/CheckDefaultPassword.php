<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CheckDefaultPassword
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $redirectToRoute = null)
    {
        // if ($request->user() ||
        //     $request->user()->is_default_password) {
        //     return $request->expectsJson()
        //     ? abort(403, 'Your email address is not verified.')
        //     : Redirect::guest(URL::route($redirectToRoute ?: 'verification.notice'));
        // }

        return $next($request);
    }
}