<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class FetchMetalPrices extends Command
{
    /**
     * The console command description.
     *
     * @var string
     */
    protected $signature = 'prices:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch latest metal prices and currency rates';

    /**
     * Execute the console command.
     */
    public function handle(\App\Services\MetalService $service)
    {
        $this->info('Fetching metal prices...');
        $service->updatePrices();
        $this->info('Prices updated successfully!');
    }
}
