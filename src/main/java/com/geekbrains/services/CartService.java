package com.geekbrains.services;

import com.geekbrains.dto.ProductDto;
import com.geekbrains.repository.SimpleCartRepository;
import com.geekbrains.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final SimpleCartRepository simpleCartRepository;
    private final ProductRepository productRepository;


    public List<ProductDto> getProductListInCart() {
        return simpleCartRepository.getProductListInCart();
    }

    public void add(ProductDto productDto) {
        if (simpleCartRepository.getProductListInCart().contains(productDto)) return;
        simpleCartRepository.add(productDto);
    }


    public void remove(ProductDto productDto) {
        simpleCartRepository.remove(productDto);
    }


}
