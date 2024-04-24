import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    }).compile();

    // categoriesController = module.get<CategoriesController>(CategoriesController);
    categoriesService = new CategoriesService(prisma);
    categoriesController = new CategoriesController(categoriesService);

  });

  describe('findAll',  async () =>{
    it('should return an array of cats', async () =>{
      const products =  await categoriesService.findAll()
      expect(products).toHaveLength(5);

    })
  })

});
