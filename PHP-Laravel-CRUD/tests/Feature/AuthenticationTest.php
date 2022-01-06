<?php

namespace Tests\Feature;

use App\Models\Car;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    /* Não deu tempo de fazer todas <3 */
    
    /** @test */
    public function check_if_user_column_is_correct()
    {
        $user = new User;

        $expected = [
            'name',
            'email',
            'password',
            'password_verification_code',
            'email_verified_at',
            'email_verification_code',
        ];

        $array_compared = array_diff($expected, $user->getFillable());

        $this->assertEquals(0, count($array_compared));
    }

    /** @test */
    public function check_if_products_column_is_correct()
    {
        $product = new Product;

        $expected = [
            'title',
            'description',
            'price',
            'sold',
        ];

        $array_compared = array_diff($expected, $product->getFillable());

        $this->assertEquals(0, count($array_compared));
    }

    /** @test */
    public function check_if_cars_column_is_correct()
    {
        $car = new Car;

        $expected = [
            'title',
            'description',
            'price',
            'color',
            'year',
        ];

        $array_compared = array_diff($expected, $car->getFillable());

        $this->assertEquals(0, count($array_compared));
    }
}
