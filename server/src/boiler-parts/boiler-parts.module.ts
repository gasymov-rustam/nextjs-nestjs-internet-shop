import { Module } from '@nestjs/common';
import { BoilerPartsController } from './boiler-parts.controller';
import { BoilerPartsService } from './boiler-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoilerParts } from './BoilerParts.model';

@Module({
  imports: [SequelizeModule.forFeature([BoilerParts])],
  controllers: [BoilerPartsController],
  providers: [BoilerPartsService],
  exports: [BoilerPartsService],
})
export class BoilerPartsModule {}
