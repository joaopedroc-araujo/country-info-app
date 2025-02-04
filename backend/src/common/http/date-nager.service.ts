import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, retry } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DateNagerService {
  constructor(private readonly httpService: HttpService) {}

  async getAllAvailableCountries() {
    try {
      const response$ = this.httpService
        .get('https://date.nager.at/api/v3/AvailableCountries', {})
        .pipe(
          retry(2),
          map((response) => response.data),
        );

      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      throw new Error(`Failed to search countries: ${error}`);
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const response$ = this.httpService
        .get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`, {})
        .pipe(
          retry(2),
          map((response) => response.data),
        );

      const response = await lastValueFrom(response$);

      return response;
    } catch (error) {
      throw new Error(`Failed to fetch country information: ${error.message}`);
    }
  }
}
