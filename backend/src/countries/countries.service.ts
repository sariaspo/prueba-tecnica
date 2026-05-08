import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  constructor(private readonly httpService: HttpService) {}

  async getAllCountries() {
    try {
      // 1. Hacemos la petición a la API pública
      const url = 'https://restcountries.com/v3.1/all';
      const response = await firstValueFrom(this.httpService.get(url));
      const countries = response.data;

      // 2. Transformamos la información según el requerimiento de la prueba
      const transformedCountries = countries.map((country: any) => {
        return {
          nombre: country.name.common,
          // Algunos países no tienen capital, por eso hacemos esta validación
          capital: country.capital ? country.capital[0] : 'No tiene',
          region: country.region,
          poblacion: country.population,
          bandera: country.flags.png,
        };
      });

      return transformedCountries;

    } catch (error) {
      throw new HttpException('Error al obtener los países', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}