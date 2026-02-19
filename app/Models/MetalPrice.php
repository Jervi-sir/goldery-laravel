<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetalPrice extends Model
{
    /** @use HasFactory<\Database\Factories\MetalPriceFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'price',
        'currency',
        'unit',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:4',
        ];
    }
}
