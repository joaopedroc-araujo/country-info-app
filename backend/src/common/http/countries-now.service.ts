import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesNowService {
  constructor(private readonly httpService: HttpService) {}

  async getPopulationData(country: string) {
    const response$ = this.httpService
      .post('https://countriesnow.space/api/v0.1/countries/population', {
        country,
      })
      .pipe(map((response) => response.data.data.populationCounts));

    const response = await lastValueFrom(response$);
    return response;
  }

  async getFlagUrl(country: string) {
    const response$ = this.httpService
      .post('https://countriesnow.space/api/v0.1/countries/flag/images', {
        country,
      })
      .pipe(map((response) => response.data.data.flag));

    const response = await lastValueFrom(response$);
    return response;
  }
}
