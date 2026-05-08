import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  imports: [HttpModule], // <--- Importamos la herramienta para consumir APIs
  providers: [CountriesService],
  controllers: [CountriesController]
})
export class CountriesModule {}