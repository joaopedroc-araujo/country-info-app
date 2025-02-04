import { Injectable } from '@nestjs/common';
import { CountriesnowService } from 'src/common/http/countries-now.service';
import { DateNagerService } from 'src/common/http/date-nager.service';

@Injectable()
export class CountriesService {
  constructor(
    private readonly dateNagerService: DateNagerService,
    private readonly countriesNowService: CountriesnowService,
  ) { }

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
      
      const formattedCountryInfo = {
        name: countryInfo.commonName,
        borders: borderCountries,
        population: populationData,
        flagUrl,
      };

      return formattedCountryInfo;
    } catch (error) {
      throw new Error(`Failed to find country: ${error}`);
    }
  }
}
