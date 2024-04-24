import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {

  }
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.categories.create({
      data: {
        name: createCategoryDto.name
      },
    });
  }

  findAll() {
    return this.prisma.categories.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findOne(id: number) {
    return this.prisma.categories.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.categories.update({
      where: { id: id },
      data: updateCategoryDto
    });
  }

  remove(id: number) {
    try {
      return this.prisma.categories.delete({ where: { id } });
    } catch (error) {
      console.log(error)
    }
  }
}