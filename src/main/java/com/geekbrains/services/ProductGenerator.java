package com.geekbrains.services;

import com.geekbrains.entities.Product;
import com.geekbrains.repository.ProductRepository;
import com.github.javafaker.Faker;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;


@Component
public class ProductGenerator {

    private final ProductRepository productRepository;

    private final Faker faker;

    public ProductGenerator(ProductRepository productRepository, Faker faker) {
        this.productRepository = productRepository;
        this.faker = faker;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void generateProducts() {
        String company1 = faker.company().name();
        String company2 = faker.company().name();
        String company3 = faker.company().name();

        for (int i = 0; i < 20; i++) {
            Product product = new Product();
            product.setTitle(faker.commerce().productName());
            product.setPrice(BigDecimal.valueOf(Math.random() * 100000));
            if (i % 2 == 0) {
                product.setManufacturer(company1);
            } else if (i % 3 == 0) {
                product.setManufacturer(company2);
            } else product.setManufacturer(company3);
            productRepository.save(product);
        }


    }
}
