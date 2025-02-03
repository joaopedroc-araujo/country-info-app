import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, retry, tap, timeout } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesnowService {
  private readonly logger = new Logger(CountriesnowService.name);
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
          tap(() => this.logger.log('Dados populacionais obtidos com sucesso')),
          catchError((error) => {
            this.logger.error(`Erro na requisição: ${error.message}`);
            throw error;
          }),
        );

      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      this.logger.error(`Erro crítico: ${error.message}`);
      throw new Error(`Falha ao buscar dados populacionais: ${error.message}`);
    }
  }

  async getFlagUrl(country: string) {
    try {
      const response$ = this.httpService
        .post(
          'https://countriesnow.space/api/v0.1/countries/flag/images',
          { country },
          {
            timeout: this.API_TIMEOUT,
          },
        )
        .pipe(
          timeout(this.API_TIMEOUT),
          retry(2),
          map((response) => response.data.data.flag),
          tap(() => this.logger.log('URL da bandeira obtida com sucesso')),
          catchError((error) => {
            this.logger.error(`Erro na requisição: ${error.message}`);
            throw error;
          }),
        );

      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      this.logger.error(`Erro crítico: ${error.message}`);
      throw new Error(`Falha ao buscar URL da bandeira: ${error.message}`);
    }
  }
}
