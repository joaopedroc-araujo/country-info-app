import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';
import { DateNagerService } from './common/http/date-nager.service';
import { CountriesNowService } from './common/http/countries-now.service';

@Module({
  imports: [HttpModule],
  controllers: [CountriesController],
  providers: [CountriesService, DateNagerService, CountriesNowService],
})
export class AppModule {}
