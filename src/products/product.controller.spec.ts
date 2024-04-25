import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
    let productsService: ProductsService;
    let productsController: ProductsController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                ProductsService,
                {
                    provide: PrismaService,
                    useClass: PrismaService
                },
            ],
        }).compile();
        productsService = module.get<ProductsService>(ProductsService);
        productsController = module.get<ProductsController>(ProductsController);
    });
    describe('findAll', () => {
        it('should return an array of products', async () => {
            const products = await productsController.findAll();
            expect(products).toHaveLength(5);
        })
    })
});