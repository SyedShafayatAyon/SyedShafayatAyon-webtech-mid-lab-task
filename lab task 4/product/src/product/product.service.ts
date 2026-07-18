import {
  Inject,
  Injectable,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(product)
    private productRepo: Repository<product>,
  ) {}

  getAllProducts() {
    return this.productRepo.find();
  }

  public async getProductById(id: number) {
    const idExist = await this.productRepo.findOne({
      where: { id: id },
    });
    if (idExist) {
      return this.productRepo.findOne({ where: { id: id } });
    } else {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  public async getProductByCategory(category: string) {
    const categoryExist = await this.productRepo.find({
      where: { category: category },
    });
    if (categoryExist.length == 0) {
      throw new NotFoundException(`No products found in category: ${category}`);
    }
    const productList = await this.productRepo.find({
      where: { category: category },
    });
    return productList;
  }

  public async createNewProduct(productInfo: CreateProductDto) {
    let newProduct = this.productRepo.create(productInfo);
    newProduct = await this.productRepo.save(newProduct);
    return newProduct;
  }

  public async updateProduct(id: number, productInfo: CreateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepo.update(id, productInfo);
    return this.productRepo.findOne({ where: { id } });
  }

  public async updateProductPartially(
    id: number,
    productInfo: Partial<UpdateProductDto>,
  ) {
    const product = await this.productRepo.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const safeInfo = productInfo ?? {};
    Object.keys(safeInfo).forEach((key) => {
      if (safeInfo[key] !== undefined) {
        product[key] = safeInfo[key];
      }
    });
    await this.productRepo.update(id, safeInfo);
    return this.productRepo.findOne({ where: { id } });
    // const updateProduct = Object.assign(product, productInfo);
    // await this.productRepo.save(updateProduct);
    // return updateProduct;
  }

  public async deleteProduct(id: number) {
    const productId = await this.productRepo.findOne({
      where: { id: id },
    });
    if (!productId) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepo.delete(id);
    return { message: 'Product deleted successfully', id: id };
  }

  public async searchProduct(keyword: string) {
    const products = await this.productRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });

    if (!products) {
      throw new NotFoundException(`Product not found`);
    }
    return products;
  }

  public async toggleActive(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    product.isActive = !product.isActive;
    const updatedProduct = await this.productRepo.save(product);

    return {
      message: 'Product status toggled successfully',
      data: updatedProduct,
    };
  }
}
