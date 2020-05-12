import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { SigninDto, SignupDto, LoggedInDto } from './dto';
import { User } from '../user/user.entity';
import { RoleType } from '../role/roletype.enum';
import { IJwtPayload } from './jwt-payload.interface';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository​​)
    private readonly _authRespository: AuthRepository​​,
    private readonly _jwtService: JwtService,
  ){}

  // registrar nuestro usuario
  async signup(signupDto: SignupDto​​): Promise<void> {
    const { username, email } = signupDto;
    const userExists = await this._authRespository.findOne({
      where: [{ username }, { email }] // estoy buscando el usuari q tenga el username 'O' que tenga email
    });
    if (userExists) {
      // el usuario existe entonce no se puede loguear, le tiramos un error
      throw new ConflictException('El usuario o email existe');
    }
    return this._authRespository.signup(signupDto);
  }

  // este metodo va devolver un objeto que sera el token 
  async signin(signinDto​​: SigninDto​​): Promise<LoggedInDto> {
    const { username, password } = signinDto;
    const user: User = await this._authRespository.findOne({
      where: {username},
    });
    if (!user) {
      throw new NotFoundException('El Usuario no existe');
    }

    // si el usuario existe, vamos a validar la contraseña
    const isMatch = await compare(password, user.password); // campara los pass y devuelve un boolena
    if (!isMatch) {
      throw new UnauthorizedException('Invalido la credenciales');
    }

    // el pass es valido
    const payload: IJwtPayload​​ = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(r => r.name as RoleType), // role es un array por ello usamos el map
    }
    // creamos y asignamos el token
    const token = this._jwtService.sign(payload);
    return plainToClass(LoggedInDto, {token, user});
  }
}
