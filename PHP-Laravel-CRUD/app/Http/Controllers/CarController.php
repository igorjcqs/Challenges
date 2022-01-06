<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum",["except"=>["index","show"]]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cars=Car::all();

        return response()->json([
            "success"=>true,
            "cars"=>$cars,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $req->validate([
            "title"=>"required",
            "description"=>"required",
            "price"=>"required",
            "color"=>"required",
            "year"=>"required",
        ]);

        $car=Car::create([
            "title"=>$req->title,
            "description"=>$req->description,
            "price"=>$req->price,
            "color"=>$req->color,
            "year"=>$req->year,
        ]);

        return response()->json([
            "success"=>true,
            "cars"=>$car,
            "message"=>"Carro inserido no banco de dados!",
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $car=Car::find($id);

        return response()->json([
            "success"=>true,
            "cars"=>$car,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function edit(Car $car)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $car=Car::find($id);

        $car->update($req->all());

        return response()->json([
            "success"=>true,
            "car"=>$car,
            "message"=>"O carro ${id} foi atualizado com sucesso!",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Car::find($id)->delete();

        return response()->json([
            "success"=>true,
            "message"=>"O carro ${id} foi deletado com sucesso!",
        ]);
    }
}
