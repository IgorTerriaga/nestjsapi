import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {

  }
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        categoriesId: createProductDto.categoryId
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });

  }
  async remove(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
