package com.brunno.mesalivre.service;

import com.brunno.mesalivre.model.Restaurante;
import com.brunno.mesalivre.repository.RestauranteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestauranteService {

    private final RestauranteRepository restauranteRepository;

    public List<Restaurante> listarTodos() {
        return restauranteRepository.findAll();
    }

    public Restaurante buscarPorId(Long id) {
        return restauranteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurante não encontrado"));
    }

    public Restaurante criar(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    public Restaurante atualizar(Long id, Restaurante restauranteAtualizado) {
        Restaurante restaurante = buscarPorId(id);

        restaurante.setNome(restauranteAtualizado.getNome());
        restaurante.setEndereco(restauranteAtualizado.getEndereco());
        restaurante.setTelefone(restauranteAtualizado.getTelefone());
        restaurante.setEmail(restauranteAtualizado.getEmail());

        return restauranteRepository.save(restaurante);
    }

    public void excluir(Long id) {
        Restaurante restaurante = buscarPorId(id);
        restauranteRepository.delete(restaurante);
    }
}