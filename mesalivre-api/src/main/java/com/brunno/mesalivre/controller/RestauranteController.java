package com.brunno.mesalivre.controller;

import com.brunno.mesalivre.model.Restaurante;
import com.brunno.mesalivre.service.RestauranteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurantes")
@RequiredArgsConstructor
public class RestauranteController {

    private final RestauranteService restauranteService;

    @GetMapping
    public List<Restaurante> listarTodos() {
        return restauranteService.listarTodos();
    }

    @GetMapping("/{id}")
    public Restaurante buscarPorId(@PathVariable Long id) {
        return restauranteService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Restaurante criar(@RequestBody Restaurante restaurante) {
        return restauranteService.criar(restaurante);
    }

    @PutMapping("/{id}")
    public Restaurante atualizar(@PathVariable Long id, @RequestBody Restaurante restaurante) {
        return restauranteService.atualizar(id, restaurante);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        restauranteService.excluir(id);
    }
}