import { Module } from '@nestjs/common';
// base de datos
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { config } from './orm.config';
// 
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
// 
import { Configuration } from './config/config.key';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule],
})
export class AppModule {
  static port: number | string;
  constructor(
    // _ para indicar q es un servicio inyectado
    private readonly _configService: ConfigService
  ){
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
