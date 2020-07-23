import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  async addProduct(
    @Body() productDto :ProductsDTO
  ) {
    const genratedId =await  this.productsService.insertProduct(productDto);
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
    @Body() productDto :ProductsDTO
  ) {
  const product= await  this.productsService.updateProduct(
      prodId,
      productDto
    );
    return {msg:"Product get updated"};
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string){
      this.productsService.deleteProduct(prodId)
    return {"msg":"Product get Deleted"}
  }
}
