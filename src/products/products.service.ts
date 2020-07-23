import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async insertProduct(data) {
    const newProduct = new this.productModel(data);
    const result = await newProduct.save();
    return result.id as string;
  }

  async getAllProduucts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSigleProduct(prodId: string) {
      let product;
    try {
       product = await this.productModel.findById(prodId);
      if (!product) {
        throw new NotFoundException('Could not found product');
      }
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
      };
    } catch (error) {
        throw new NotFoundException('Could not found product');
    }
  }

 async updateProduct(prodId,data) {
    let updatedProduct;
    try {
        updatedProduct = await this.productModel.findById(prodId);
      if (!updatedProduct) {
        throw new NotFoundException('Could not found product');
      }
    if (data.title) {
      updatedProduct.title = data.title;
    }
    if (data.description) {
      updatedProduct.description = data.desc;
    }
    if (data.price) {
      updatedProduct.price = data.price;
    }
     updatedProduct.save()
    } catch (error) {
        throw new NotFoundException('Could not found product');
    }
  }

  async deleteProduct(prodId: string) {
    try {
      const product = await this.productModel.deleteOne({_id:prodId});
      if (product.n===0) {
        throw new NotFoundException('Could not found product');
      }
      return null
    } catch (error) {
        throw new NotFoundException('Could not found product');
    }
  }
}
