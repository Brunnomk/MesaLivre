package com.brunno.mesalivre.service;

import com.brunno.mesalivre.model.Mesa;
import com.brunno.mesalivre.model.Restaurante;
import com.brunno.mesalivre.repository.MesaRepository;
import com.brunno.mesalivre.repository.ReservaRepository;
import com.brunno.mesalivre.repository.RestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MesaService {

    private final MesaRepository mesaRepository;
    private final RestauranteRepository restauranteRepository;
    private final ReservaRepository reservaRepository;

    public List<Mesa> listarTodas() {
        return mesaRepository.findAll();
    }

    public Mesa buscarPorId(Long id) {
        return mesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa não encontrada"));
    }

    public List<Mesa> listarPorRestaurante(Long restauranteId) {
        return mesaRepository.findByRestauranteId(restauranteId);
    }

    public Mesa criar(Long restauranteId, Mesa mesa) {
        Restaurante restaurante = restauranteRepository.findById(restauranteId)
                .orElseThrow(() -> new RuntimeException("Restaurante não encontrado"));

        mesa.setRestaurante(restaurante);

        return mesaRepository.save(mesa);
    }

    public Mesa atualizar(Long id, Mesa mesaAtualizada) {
        Mesa mesa = buscarPorId(id);

        mesa.setNumero(mesaAtualizada.getNumero());
        mesa.setCapacidade(mesaAtualizada.getCapacidade());
        mesa.setLocalizacao(mesaAtualizada.getLocalizacao());
        mesa.setDisponivel(mesaAtualizada.getDisponivel());

        return mesaRepository.save(mesa);
    }

    public void excluir(Long id) {
        Mesa mesa = buscarPorId(id);

        boolean mesaPossuiReservas = reservaRepository.existsByMesaId(id);

        if (mesaPossuiReservas) {
            throw new RuntimeException("Não é possível excluir esta mesa porque existem reservas associadas.");
        }

        mesaRepository.delete(mesa);
    }
}