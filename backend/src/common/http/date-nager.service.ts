import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, lastValueFrom } from 'rxjs';

@Injectable()
export class DateNagerService {
  constructor(private readonly httpService: HttpService) {}

  async getAllAvailableCountries() {
    const response$ = this.httpService
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .pipe(map((response) => response.data));

    const response = await lastValueFrom(response$);
    return response;
  }

  async getCountryInfo(countryCode: string) {
    const response$ = this.httpService
      .get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
      .pipe(map((response) => response.data));

    const response = await lastValueFrom(response$);
    return response;
  }
}
