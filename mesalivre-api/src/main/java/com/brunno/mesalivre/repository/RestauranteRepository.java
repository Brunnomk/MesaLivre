package com.brunno.mesalivre.repository;

import com.brunno.mesalivre.model.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {
}