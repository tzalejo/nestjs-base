import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
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
