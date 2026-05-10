<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Broker extends Model
{
    protected $table = 'broker';
    protected $primaryKey = 'id_broker';
    public $timestamps = false;

    protected $fillable = [
        'nama',
        'no_hp',
        'email',
        'tingkatan',
        'id_broker_senior',
    ];

    public function senior()
    {
        return $this->belongsTo(Broker::class, 'id_broker_senior', 'id_broker');
    }

    public function junior()
    {
        return $this->hasMany(Broker::class, 'id_broker_senior', 'id_broker');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_broker', 'id_broker');
    }
}
