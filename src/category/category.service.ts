import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(CreateCategoryDto: CreateCategoryDto) {
    console.log(CreateCategoryDto);
    try {
      const category = this.categoryRepository.create(CreateCategoryDto);
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    const categoryList = this.categoryRepository
      .createQueryBuilder('category')
      .getMany();
    return categoryList;
  }

  findOne(id: number) {
    try {
      const category = this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .getOne();

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .update(UpdateCategoryDto)
        .execute()
        .then((result) => {
          return result;
        });

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    try {
      const category = this.categoryRepository
        .createQueryBuilder('category')
        .where('category.id = :id', { id: id })
        .delete()
        .execute();

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
