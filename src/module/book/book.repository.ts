import { Repository, EntityRepository } from "typeorm";
import { Book } from "./book.entity";

// Este decorador va a indicar q nuestro usuario va a ser una entidad DB
// por tanto va proveer de todo los metodos necesarios.
@EntityRepository(Book)
export class BookRepository extends Repository<Book>{}