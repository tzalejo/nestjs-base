import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    // que si la variable d entorno node_env no esta declarada..osea si no es production
    const isDevelopmenEnv = process.env.NODE_ENV !== 'production';
    // console.log('isDevelopmenEnv',isDevelopmenEnv);
    // console.log('process.env.NODE_ENV ',process.env.NODE_ENV );
    if (isDevelopmenEnv) {
      // cargamos todo las variable de entorno, ya que estamos en desarrollo..
      const envFilePath = `${__dirname}/../../.env`;
      const existsPath = fs.existsSync(envFilePath);
      // console.log('existsPath', existsPath);
      // tenemos que comprobar si existe
      if (!existsPath) {
        console.log('.env file does not exist');
        // terminamos el proceso
        process.exit(0);
      }
      // si existe, estamos en desarrollo
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      // estamos en produccion:
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  // metodo que nos devuelve un key
  get(key: string): string {
    return this.envConfig[key];
  }
}
