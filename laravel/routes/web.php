<?php

use App\Events\NewThingAvailable;
use App\Events\OrderDispatched;
use App\Http\Controllers\ProfileController;
use App\Models\Order;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Nuwave\Lighthouse\Execution\Utils\Subscription;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/broadcast', function () {
    NewThingAvailable::dispatch('It works');
});

Route::get('/broadcast/private', function () {
    OrderDispatched::dispatch(Order::find(1));
});

Route::get('/user/{id}', function ($id) {
    return Redis::get($id);
});

Route::middleware('auth:sanctum')->get('/new', function () {
    $post = Post::create([
        'user_id' => auth()->id(),
        'body' => 'Random ' . rand(1111, 9999)
    ]);
    // Log::info('info');
    Subscription::broadcast('postCreated', $post);

    return $post;
});

require __DIR__ . '/auth.php';
