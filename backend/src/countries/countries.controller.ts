import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  async getAvailableCountries() {
    try {
      return this.countriesService.getAvailableCountries();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':countryCode/info')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    try {
      return this.countriesService.getCountryInfo(countryCode);
    } catch (error) {
      throw new Error(error);
    }
  }
}
