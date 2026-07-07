package com.brunno.mesalivre.service;

import com.brunno.mesalivre.enums.StatusReserva;
import com.brunno.mesalivre.model.Cliente;
import com.brunno.mesalivre.model.Mesa;
import com.brunno.mesalivre.model.Reserva;
import com.brunno.mesalivre.model.Restaurante;
import com.brunno.mesalivre.repository.ClienteRepository;
import com.brunno.mesalivre.repository.MesaRepository;
import com.brunno.mesalivre.repository.ReservaRepository;
import com.brunno.mesalivre.repository.RestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final RestauranteRepository restauranteRepository;
    private final MesaRepository mesaRepository;
    private final ClienteRepository clienteRepository;

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public List<Reserva> listarPorRestaurante(Long restauranteId) {
        return reservaRepository.findByRestauranteId(restauranteId);
    }

    public List<Reserva> listarPorMesa(Long mesaId) {
        return reservaRepository.findByMesaId(mesaId);
    }

    public List<Reserva> listarPorCliente(Long clienteId) {
        return reservaRepository.findByClienteId(clienteId);
    }

    public List<Reserva> listarPorData(LocalDate data) {
        return reservaRepository.findByData(data);
    }

    public Reserva buscarPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));
    }

    public Reserva criar(Long restauranteId, Long mesaId, Long clienteId, Reserva reserva) {
        Restaurante restaurante = restauranteRepository.findById(restauranteId)
                .orElseThrow(() -> new RuntimeException("Restaurante não encontrado"));

        Mesa mesa = mesaRepository.findById(mesaId)
                .orElseThrow(() -> new RuntimeException("Mesa não encontrada"));

        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        if (!mesa.getRestaurante().getId().equals(restaurante.getId())) {
            throw new RuntimeException("A mesa não pertence ao restaurante informado");
        }

        if (reserva.getData().isBefore(LocalDate.now())) {
            throw new RuntimeException("Não é possível criar reserva em data passada");
        }

        if (reserva.getData().isEqual(LocalDate.now()) && reserva.getHoraInicio().isBefore(LocalTime.now())) {
            throw new RuntimeException("Não é possível criar reserva em horário passado");
        }

        if (!reserva.getHoraFim().isAfter(reserva.getHoraInicio())) {
            throw new RuntimeException("A hora fim deve ser maior que a hora início");
        }

        if (reserva.getQuantidadePessoas() > mesa.getCapacidade()) {
            throw new RuntimeException("Quantidade de pessoas excede a capacidade da mesa");
        }

        boolean existeConflito = reservaRepository.existsConflitoHorario(
                mesaId,
                reserva.getData(),
                reserva.getHoraInicio(),
                reserva.getHoraFim(),
                StatusReserva.CANCELADA
        );

        if (existeConflito) {
            throw new RuntimeException("Já existe uma reserva para esta mesa nesse horário");
        }

        reserva.setRestaurante(restaurante);
        reserva.setMesa(mesa);
        reserva.setCliente(cliente);
        reserva.setStatus(StatusReserva.PENDENTE);

        return reservaRepository.save(reserva);
    }

    public Reserva confirmar(Long id) {
        Reserva reserva = buscarPorId(id);

        if (reserva.getStatus() == StatusReserva.CANCELADA) {
            throw new RuntimeException("Não é possível confirmar uma reserva cancelada");
        }

        if (reserva.getStatus() == StatusReserva.FINALIZADA) {
            throw new RuntimeException("Não é possível confirmar uma reserva finalizada");
        }

        reserva.setStatus(StatusReserva.CONFIRMADA);
        return reservaRepository.save(reserva);
    }

    public Reserva cancelar(Long id) {
        Reserva reserva = buscarPorId(id);

        if (reserva.getStatus() == StatusReserva.CANCELADA) {
            throw new RuntimeException("Esta reserva já está cancelada");
        }

        if (reserva.getStatus() == StatusReserva.FINALIZADA) {
            throw new RuntimeException("Não é possível cancelar uma reserva finalizada");
        }

        reserva.setStatus(StatusReserva.CANCELADA);
        return reservaRepository.save(reserva);
    }

    public Reserva finalizar(Long id) {
        Reserva reserva = buscarPorId(id);

        if (reserva.getStatus() == StatusReserva.CANCELADA) {
            throw new RuntimeException("Não é possível finalizar uma reserva cancelada");
        }

        if (reserva.getStatus() == StatusReserva.FINALIZADA) {
            throw new RuntimeException("Esta reserva já está finalizada");
        }

        if (reserva.getStatus() != StatusReserva.CONFIRMADA) {
            throw new RuntimeException("Só é possível finalizar uma reserva confirmada");
        }

        reserva.setStatus(StatusReserva.FINALIZADA);
        return reservaRepository.save(reserva);
    }

    public void excluir(Long id) {
        Reserva reserva = buscarPorId(id);
        reservaRepository.delete(reserva);
    }
}