import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    const genratedId =await  this.productsService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
    return { id: genratedId ,msg:"Product get saved" };
  }

  @Get()
  async getAllProducts() {
    const products=await this.productsService.getAllProduucts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    const product=await this.productsService.getSigleProduct(prodId);
    return product
  }

  @Patch(':id')
 async updateProduct(
    @Param('id') prodId: string,
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
  const product= await  this.productsService.updateProduct(
      prodId,
      productTitle,
      productDesc,
      productPrice,
    );
    return {msg:"Product get updated"};
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string){
      this.productsService.deleteProduct(prodId)
    return {"msg":"Product get Deleted"}
  }
}
