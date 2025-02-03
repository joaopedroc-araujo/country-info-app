import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, retry } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DateNagerService {
  private readonly logger = new Logger(DateNagerService.name);

  constructor(private readonly httpService: HttpService) {}

  async getAllAvailableCountries() {
    try {
      const response$ = this.httpService
        .get('https://date.nager.at/api/v3/AvailableCountries', {})
        .pipe(
          retry(2),
          map((response) => response.data),
          catchError((error) => {
            this.logger.error(`Erro na requisição: ${error}`);
            throw error;
          }),
        );
      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      throw new Error(`Falha ao buscar países: ${error}`);
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const response$ = this.httpService
        .get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`, {})
        .pipe(
          retry(2),
          map((response) => response.data),
          catchError((error) => {
            throw error;
          }),
        );

      const response = await lastValueFrom(response$);
      console.log('response', response);
      return response;
    } catch (error) {
      this.logger.error(`Erro crítico: ${error.message}`);
      throw new Error(`Falha ao buscar informações do país: ${error.message}`);
    }
  }
}
