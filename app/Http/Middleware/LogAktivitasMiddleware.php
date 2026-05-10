<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class LogAktivitasMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        try {
            DB::table('log_aktivitas')->insert([
                'aktivitas' => $request->method() . ' ' . $request->path() . ' | Status: ' . $response->getStatusCode() . ' | IP: ' . $request->ip(),
                'waktu' => now(),
            ]);
        } catch (Throwable $e) {

        }

        return $response;
    }
}
