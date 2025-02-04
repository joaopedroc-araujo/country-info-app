import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, retry, tap, timeout } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesnowService {
  private readonly API_TIMEOUT = 5000;

  constructor(private readonly httpService: HttpService) {}

  async getPopulationData(country: string) {
    try {
      const response$ = this.httpService
        .post(
          'https://countriesnow.space/api/v0.1/countries/population',
          { country },
          {
            timeout: this.API_TIMEOUT,
          },
        )
        .pipe(
          timeout(this.API_TIMEOUT),
          retry(2),
          map((response) => response.data.data.populationCounts),
        );

      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      throw new Error(`Failed to get populational data: ${error.message}`);
    }
  }

  async getFlagUrl(country: string) {
    try {
      const response$ = this.httpService
        .post(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
          { iso2: country },
          {
            timeout: this.API_TIMEOUT,
          },
        )
        .pipe(
          timeout(this.API_TIMEOUT),
          retry(2),
          map((response) => response.data.data.flag),
        );

      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      throw new Error(`Failed to get flag URL: ${error.message}`);
    }
  }
}
