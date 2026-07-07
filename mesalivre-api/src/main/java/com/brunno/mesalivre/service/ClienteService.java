package com.brunno.mesalivre.service;

import com.brunno.mesalivre.model.Cliente;
import com.brunno.mesalivre.repository.ClienteRepository;
import com.brunno.mesalivre.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ReservaRepository reservaRepository;

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    public Cliente criar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Cliente cliente = buscarPorId(id);

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setTelefone(clienteAtualizado.getTelefone());
        cliente.setEmail(clienteAtualizado.getEmail());

        return clienteRepository.save(cliente);
    }

    public void excluir(Long id) {
        Cliente cliente = buscarPorId(id);

        boolean clientePossuiReservas = reservaRepository.existsByClienteId(id);

        if (clientePossuiReservas) {
            throw new RuntimeException("Não é possível excluir este cliente porque existem reservas associadas.");
        }

        clienteRepository.delete(cliente);
    }
}