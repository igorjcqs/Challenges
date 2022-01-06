<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/* Authentication Routes */

Route::post("register",[AuthController::class,"register"]);
Route::post("login",[AuthController::class,"login"]);
Route::post("logout",[AuthController::class,"logout"]);
Route::post("changepassword",[AuthController::class,"change_password"]);

Route::post("verifyemail",[AuthController::class,"send_email_checker"]);
Route::post("verifyemail/{email}/{code}",[AuthController::class,"check_email"]);

Route::post("resetpassword",[AuthController::class,"send_resetpass_email"]);
Route::post("resetpassword/{email}/{code}",[AuthController::class,"resetpass"]);

/* CRUD - Products */

Route::post("products/create",[ProductController::class,"store"]);

Route::get("products/read",[ProductController::class,"index"]);
Route::get("products/read/{id}",[ProductController::class,"show"]);

Route::put("products/update/{id}",[ProductController::class,"update"]);

Route::delete("products/delete/{id}",[ProductController::class,"destroy"]);

/* CRUD - Cars */

Route::post("cars/create",[CarController::class,"store"]);

Route::get("cars/read",[CarController::class,"index"]);
Route::get("cars/read/{id}",[CarController::class,"show"]);

Route::put("cars/update/{id}",[CarController::class,"update"]);

Route::delete("cars/delete/{id}",[CarController::class,"destroy"]);