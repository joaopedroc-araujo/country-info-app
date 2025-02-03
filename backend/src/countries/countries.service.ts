import { Injectable } from '@nestjs/common';
import { CountriesnowService } from 'src/common/http/countries-now.service';
import { DateNagerService } from 'src/common/http/date-nager.service';

@Injectable()
export class CountriesService {
  constructor(
    private readonly dateNagerService: DateNagerService,
    private readonly countriesNowService: CountriesnowService,
  ) {}

  async getAvailableCountries(): Promise<string[]> {
    try {
      return this.dateNagerService.getAllAvailableCountries();
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getCountryInfo(country: string): Promise<any> {
    try {
      const countryInfo = await this.dateNagerService.getCountryInfo(country);
      console.log(countryInfo);
      const availableCountries =
        await this.dateNagerService.getAllAvailableCountries();
      console.log(availableCountries);

      const [populationData, flagUrl] = await Promise.all([
        this.countriesNowService.getPopulationData(countryInfo.commonName),
        this.countriesNowService.getFlagUrl(countryInfo.commonName),
      ]);
      console.log(populationData, flagUrl);

      const borderCountries = countryInfo.borders.map(
        (borderCode) =>
          availableCountries.find((c) => c.countryCode === borderCode)?.name ||
          borderCode,
      );
      console.log(borderCountries);

      return {
        borders: borderCountries,
        population: populationData,
        flagUrl,
      };
    } catch (error) {
      throw new Error(`Failed to find country: ${error}`);
    }
  }
}
