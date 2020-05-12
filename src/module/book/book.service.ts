import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { In } from 'typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { Book } from './book.entity';
import { status } from './../../shared/entity-status.num';
import { ReadBookDto, UpdateBookDto, CreateBookDto} from './dto';
import { User } from '../user/user.entity';
import { Role } from './../role/role.entity'
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository
  ){}

  async get(bookId: number): Promise<ReadBookDto> {
    if (!bookId) {
      throw new BadRequestException('Id es necesario');
    }
    // busco book
    const book: Book = await this._bookRepository.findOne(bookId, {
      where: { status: status.ACTIVE } 
    });
    // vemos q el book exita..
    if (!book) {
      throw new NotFoundException('El book no existe');
    }
    // retornamos..
    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]>{
    const books: Book[] = await this._bookRepository.find({
      where: { status : status.ACTIVE }
    });

    return books.map((book) => plainToClass(ReadBookDto, book));
  }

  // retorna todo los libro de un autor(id)
  async getBookByAuthor(authorId: number): Promise<ReadBookDto[]> {
    if (!authorId) {
      throw new BadRequestException('Id es requerido');
    }

    const books: Book[] = await this._bookRepository.find({
      // se traduce con In de bd..osea que buscque todo los libros dnd los autores sea los q estan en IN  
      where: {status: status.ACTIVE, authors: In([authorId]) }
    });
    // retorno todo los libros
    return books.map((book) => plainToClass(ReadBookDto, book));
  }

  // Para crear un libro debo ser autor..
  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];
    // recorro todo los autores de dicho libro..
    // Recordar al momento de crear un libro se puede enviar un array d autores..
    for (const authorId in book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: status.ACTIVE },
      });

      if (!authorExists) {
        throw new NotFoundException(`No existe un autor con id: ${authorId}`);
      }
      // recordar q tiene q sera autor para crear un libro
      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new UnauthorizedException(`Este usuario ${authorId} no es un autor`);
      }

      authors.push(authorExists);
    }

    const saveBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });
    return plainToClass(ReadBookDto, saveBook);
  }

  // crear un libro pero que el autor exista..
  async createByAuthor(book: Partial<CreateBookDto>, authorId: number) {

    const author = await this._userRepository.findOne(authorId, {
      where: { status: status.INACTIVE },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.AUTHOR,
    );
    
    if (!isAuthor) {
      throw new UnauthorizedException(`Este usuario ${authorId} no es un autor`);
    }

    const saveBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author
    });
    return plainToClass(ReadBookDto, saveBook);
  }

  async update(
    bookId: number, 
    book: Partial<UpdateBookDto>,
    authorId: number,
  ): Promise<ReadBookDto> {
    // existe el book
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: status.ACTIVE},
    });
    // retorn error si no existe
    if (!bookExists) {
      throw new NotFoundException('Este book no existe');
    }
    // si el autor es un libro propio
    const isOwnBook = bookExists.authors.some((author) => author.id === authorId);

    if (!isOwnBook) {
      throw new NotFoundException('Este usuario no es el autor del libro');
    }
    // actualizamos
    const updateBook = await this._bookRepository.update(bookId, book);

    return plainToClass(ReadBookDto, updateBook);
  }

  async delete(bookId: number): Promise<void>{
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: {status: status.ACTIVE},
    });

    if (!bookExists) {
      throw new NotFoundException('Este libro no existe');
    }

    await this._bookRepository.update(bookId, {status: status.INACTIVE});
  }

  
}
