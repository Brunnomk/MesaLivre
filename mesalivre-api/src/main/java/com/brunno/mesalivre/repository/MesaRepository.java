package com.brunno.mesalivre.repository;

import com.brunno.mesalivre.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MesaRepository extends JpaRepository<Mesa, Long> {

    List<Mesa> findByRestauranteId(Long restauranteId);
}