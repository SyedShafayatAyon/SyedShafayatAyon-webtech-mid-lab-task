import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Get('category/:category')
  getProductByCategory(@Param('category') category: string) {
    return this.productService.getProductByCategory(category);
  }

  @Get('keyword/:keyword')
  searchProduct(@Param('keyword') keyword: string) {
    return this.productService.searchProduct(keyword);
  }

  @Post()
  createNewProduct(@Body() productInfo: CreateProductDto) {
    return this.productService.createNewProduct(productInfo);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productInfo: CreateProductDto,
  ) {
    return this.productService.updateProduct(id, productInfo);
  }

  @Patch(':id')
  updateProductPartially(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInfo: UpdateProductDto,
  ) {
    return this.productService.updateProductPartially(id, updateInfo);
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.productService.toggleActive(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
