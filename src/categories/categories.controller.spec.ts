import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoriesService: CategoriesService;
  let categoriesController: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useClass: PrismaService,
        },
      ],
    }).compile();
    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesController = module.get<CategoriesController>(CategoriesController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const products = await categoriesController.findAll();
      expect(products).toHaveLength(2);
    });
  });
});