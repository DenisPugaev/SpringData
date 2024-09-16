package com.geekbrains.converters;

import com.geekbrains.dto.ProductDto;
import com.geekbrains.entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {


    public Product dtoInEntity(ProductDto productDto) {
        return new Product(productDto.getId(), productDto.getTitle(), productDto.getPrice(), productDto.getManufacturer());
    }

    public ProductDto entityInDto(Product product) {
        return new ProductDto(product.getId(), product.getTitle(), product.getPrice(), product.getManufacturer());
    }
}
