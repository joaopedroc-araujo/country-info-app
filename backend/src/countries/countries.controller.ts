import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('countries')
@UseInterceptors(CacheInterceptor)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  async getAvailableCountries() {
    try {
      const response = await this.countriesService.getAvailableCountries();
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':countryCode/info')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    try {
      const response = await this.countriesService.getCountryInfo(countryCode);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
