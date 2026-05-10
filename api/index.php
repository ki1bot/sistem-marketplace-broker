<?php

declare(strict_types=1);

$path = $_GET['path'] ?? null;

if (is_string($path) && $path !== '') {
    $path = '/' . ltrim($path, '/');

    $query = $_GET;
    unset($query['path']);

    $queryString = http_build_query($query);

    $_SERVER['REQUEST_URI'] = $path . ($queryString ? '?' . $queryString : '');
    $_SERVER['PATH_INFO'] = $path;
    $_SERVER['SCRIPT_NAME'] = '/index.php';
    $_SERVER['PHP_SELF'] = '/index.php';
}

require __DIR__ . '/../public/index.php';
