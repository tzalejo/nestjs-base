import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './../config/config.module';
import{ Configuration } from './../config/config.key';
import { ConfigService } from './../config/config.service';
import { ConnectionOptions } from 'typeorm';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      // retorna toda las propiedades que soporta la conexion de postgres
      return {
        ssl: true, // necesitemos conectar a un bd en la nuve
        type: 'postgres' as 'postgres',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        // todo los archivos q conteng entity y termine .ts o .js son entidades
        entities: [`${__dirname}/../**/*entity{.ts,.js}`], 
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      } as ConnectionOptions
    }
  })
]