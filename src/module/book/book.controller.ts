import { Controller, Get, Param, ParseIntPipe, Post, UseGuards, Body, Patch, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { ReadBookDto, CreateBookDto, UpdateBookDto } from './dto';
import { RoleType } from '../role/roletype.enum';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorators/role.decorator';
import { GetUser } from '../auth/user.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Get(':bookId')
  getBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<ReadBookDto> {
    return this._bookService.get(bookId);
  }

  @Get('author/:authorId')
  getBookByAuthor(@Param('authorId', ParseIntPipe) authorId: number): Promise<ReadBookDto[]>{
    return this._bookService.getBookByAuthor(authorId);
  }

  @Get()
  getBooks(): Promise<ReadBookDto[]> {
    return this._bookService.getAll();
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(@Body() book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    return this._bookService.create(book);
  }

  @Post()
  @Roles(RoleType.AUTHOR) 
  @UseGuards(AuthGuard(), RoleGuard)
  createBookByAuth(
    @Body() role: Partial<CreateBookDto>,
    @GetUser​​('id') authorId: number
  ): Promise<ReadBookDto> {
    return this._bookService.createByAuthor(role, authorId);
  }

  @Patch(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Partial<UpdateBookDto​​>,
    @GetUser('id') authorId: number,
  ) {
    return this._bookService.update(id, role, authorId);
  }

  @Delete(':id')
  deleteBook(
    @Param('id', ParseIntPipe) id: number
  ): Promise<void>{
    return this._bookService.delete(id);
  }
  
}
