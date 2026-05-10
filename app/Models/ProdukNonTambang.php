<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProdukNonTambang extends Model
{
    protected $table = 'produk_nontambang';
    protected $primaryKey = 'id_produknontambang';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'id_produknontambang',
        'kategori',
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produknontambang', 'id_produk');
    }
}
