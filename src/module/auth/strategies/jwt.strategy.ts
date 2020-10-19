import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from './../../../config/config.service';
import { Configuration } from './../../../config/config.key';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    // necesitamo el repositorio de autenticacion para validar
    // los datos(el token correspond a un usuario , q el usuario exista, etc)
    @InjectRepository(AuthRepository) // Los repositorio cuando son inyectados tiene q tener decorador InjectRepository
    private readonly _authRepository: AuthRepository,
  ) {
    // llamamos al contrutctor passportstrategy
    super({
      // Le indicamos de donde va a venir nuestro token..
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // con esto le estamos pasando key al constructor de passportstrategy
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  // solo va tener un metodo para validar que un usuario exista.
  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    // desectructuramos
    const { username } = payload;
    // utilizamos repositorio autenticacion para buscar el usuario q corresponda con ese nombre
    const user = await this._authRepository.findOne({
      where: { username, status: 'ACTIVE' }, // busca los usuarios con el nombre username con el status active
    });

    if (!user) {
      // devuelve una excepcion de unauthorize q es una clase para especificar no autorizado
      throw new UnauthorizedException();
    }
    return payload;
  }
}
