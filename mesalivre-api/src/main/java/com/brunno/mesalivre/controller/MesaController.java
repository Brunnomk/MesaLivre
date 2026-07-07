package com.brunno.mesalivre.controller;

import com.brunno.mesalivre.model.Mesa;
import com.brunno.mesalivre.service.MesaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MesaController {

    private final MesaService mesaService;

    @GetMapping("/mesas")
    public List<Mesa> listarTodas() {
        return mesaService.listarTodas();
    }

    @GetMapping("/mesas/{id}")
    public Mesa buscarPorId(@PathVariable Long id) {
        return mesaService.buscarPorId(id);
    }

    @GetMapping("/restaurantes/{restauranteId}/mesas")
    public List<Mesa> listarPorRestaurante(@PathVariable Long restauranteId) {
        return mesaService.listarPorRestaurante(restauranteId);
    }

    @PostMapping("/restaurantes/{restauranteId}/mesas")
    @ResponseStatus(HttpStatus.CREATED)
    public Mesa criar(@PathVariable Long restauranteId, @RequestBody Mesa mesa) {
        return mesaService.criar(restauranteId, mesa);
    }

    @PutMapping("/mesas/{id}")
    public Mesa atualizar(@PathVariable Long id, @RequestBody Mesa mesa) {
        return mesaService.atualizar(id, mesa);
    }

    @DeleteMapping("/mesas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        mesaService.excluir(id);
    }
}