import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCountries() {
    try {
      // Usamos una URL que especifica los campos para que la respuesta sea más ligera
      const url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags';
      
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: { 'Accept-Encoding': 'gzip,deflate,compress' } // Ayuda con la compresión de datos
        })
      );
      
      return response.data.map((country: any) => ({
        nombre: country.name?.common || 'Sin nombre',
        capital: country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A',
        region: country.region || 'N/A',
        poblacion: country.population || 0,
        bandera: country.flags?.png || country.flags?.svg || ''
      }));
    } catch (error: any) {
      // Esto imprimirá el error real en tu consola de VS Code para que lo veamos
      console.error('ERROR DETECTADO:', error.response?.data || error.message);
      
      throw new HttpException(
        `Error API (Status ${error.response?.status}): ${error.message}`, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}