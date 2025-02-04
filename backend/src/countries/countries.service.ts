import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CountriesnowService } from 'src/common/http/countries-now.service';
import { DateNagerService } from 'src/common/http/date-nager.service';
import { Country } from 'src/interfaces/country.interface';
import { Cache } from '@nestjs/cache-manager';
export interface CountryInfo {
  name: string;
  borders: string[];
  population: [
    {
      year: number;
      value: number;
    },
  ];
  flagUrl: string;
}

@Injectable()
export class CountriesService {
  constructor(
    private readonly dateNagerService: DateNagerService,
    private readonly countriesNowService: CountriesnowService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAvailableCountries(): Promise<Country[]> {
    const cacheKey = 'available_countries';

    const cachedCountries = await this.cacheManager.get<Country[]>(cacheKey);
    if (cachedCountries) {
      return cachedCountries.sort((a, b) => a.name.localeCompare(b.name));
    }

    try {
      const countries = await this.dateNagerService.getAllAvailableCountries();
      const sortedCountries: Country[] = countries.sort(
        (a: Country, b: Country) => a.name.localeCompare(b.name),
      );
      await this.cacheManager.set(cacheKey, sortedCountries, 86400000);

      return sortedCountries;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getCountryInfo(country: string): Promise<CountryInfo> {
    const cacheKey = `country_info_${country}`;

    const cachedInfo = await this.cacheManager.get<CountryInfo>(cacheKey);
    if (cachedInfo) {
      return cachedInfo;
    }

    try {
      const countryInfo = await this.dateNagerService.getCountryInfo(country);

      const availableCountries =
        await this.dateNagerService.getAllAvailableCountries();

      const [populationData, flagUrl] = await Promise.all([
        this.countriesNowService.getPopulationData(countryInfo.commonName),
        this.countriesNowService.getFlagUrl(countryInfo.commonName),
      ]);

      const borderCountries = countryInfo.borders.map(
        (borderCode: string) =>
          availableCountries.find((c: Country) => c.countryCode === borderCode)
            ?.name || borderCode,
      );

      const formattedCountryInfo: CountryInfo = {
        name: countryInfo.commonName,
        borders: borderCountries,
        population: populationData,
        flagUrl,
      };

      await this.cacheManager.set(cacheKey, formattedCountryInfo, 86400000);

      return formattedCountryInfo;
    } catch (error) {
      throw new Error(`Failed to find country: ${error}`);
    }
  }
}
