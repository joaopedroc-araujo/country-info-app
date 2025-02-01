import { Injectable } from '@nestjs/common';
import { CountriesNowService } from 'src/common/http/countries-now.service';
import { DateNagerService } from 'src/common/http/date-nager.service';

@Injectable()
export class CountriesService {
  constructor(
    private readonly dateNagerService: DateNagerService,
    private readonly countriesNowService: CountriesNowService,
  ) {}

  async getAvailableCountries(): Promise<string[]> {
    return this.dateNagerService.getAllAvailableCountries();
  }

  async getCountryInfo(country: string): Promise<any> {
    const countryInfo = await this.dateNagerService.getCountryInfo(country);
    const availableCountries =
      await this.dateNagerService.getAllAvailableCountries();

    const [populationData, flagUrl] = await Promise.all([
      this.countriesNowService.getPopulationData(countryInfo.commonName),
      this.countriesNowService.getFlagUrl(countryInfo.commonName),
    ]);

    const borderCountries = countryInfo.borders.map(
      (borderCode) =>
        availableCountries.find((c) => c.countryCode === borderCode)?.name ||
        borderCode,
    );

    return {
      borders: borderCountries,
      population: populationData,
      flagUrl,
    };
  }
}
