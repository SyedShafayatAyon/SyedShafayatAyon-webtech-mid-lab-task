import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './product/entity/product.entity';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        username: 'postgres',
        password: 'admin',
        port: 5432,
        host: 'localhost',
        database: 'product_inventory_db',
        synchronize: true,
        entities: [product],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
