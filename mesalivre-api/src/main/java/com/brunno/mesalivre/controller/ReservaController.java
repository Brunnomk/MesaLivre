package com.brunno.mesalivre.controller;

import com.brunno.mesalivre.model.Reserva;
import com.brunno.mesalivre.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @GetMapping("/reservas")
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }

    @GetMapping("/reservas/{id}")
    public Reserva buscarPorId(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @GetMapping("/restaurantes/{restauranteId}/reservas")
    public List<Reserva> listarPorRestaurante(@PathVariable Long restauranteId) {
        return reservaService.listarPorRestaurante(restauranteId);
    }

    @GetMapping("/mesas/{mesaId}/reservas")
    public List<Reserva> listarPorMesa(@PathVariable Long mesaId) {
        return reservaService.listarPorMesa(mesaId);
    }

    @GetMapping("/clientes/{clienteId}/reservas")
    public List<Reserva> listarPorCliente(@PathVariable Long clienteId) {
        return reservaService.listarPorCliente(clienteId);
    }

    @GetMapping("/reservas/data/{data}")
    public List<Reserva> listarPorData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data
    ) {
        return reservaService.listarPorData(data);
    }

    @PostMapping("/restaurantes/{restauranteId}/mesas/{mesaId}/clientes/{clienteId}/reservas")
    @ResponseStatus(HttpStatus.CREATED)
    public Reserva criar(
            @PathVariable Long restauranteId,
            @PathVariable Long mesaId,
            @PathVariable Long clienteId,
            @RequestBody Reserva reserva
    ) {
        return reservaService.criar(restauranteId, mesaId, clienteId, reserva);
    }

    @PatchMapping("/reservas/{id}/confirmar")
    public Reserva confirmar(@PathVariable Long id) {
        return reservaService.confirmar(id);
    }

    @PatchMapping("/reservas/{id}/cancelar")
    public Reserva cancelar(@PathVariable Long id) {
        return reservaService.cancelar(id);
    }

    @PatchMapping("/reservas/{id}/finalizar")
    public Reserva finalizar(@PathVariable Long id) {
        return reservaService.finalizar(id);
    }

    @DeleteMapping("/reservas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        reservaService.excluir(id);
    }
}