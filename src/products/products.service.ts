import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
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

 async updateProduct(prodId: string, title: string, desc: string, price: number) {
    let updatedProduct;
    try {
        updatedProduct = await this.productModel.findById(prodId);
      if (!updatedProduct) {
        throw new NotFoundException('Could not found product');
      }
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
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
