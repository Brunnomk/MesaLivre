package com.brunno.mesalivre.repository;

import com.brunno.mesalivre.enums.StatusReserva;
import com.brunno.mesalivre.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByRestauranteId(Long restauranteId);

    List<Reserva> findByMesaId(Long mesaId);

    List<Reserva> findByClienteId(Long clienteId);

    List<Reserva> findByData(LocalDate data);

    boolean existsByClienteId(Long clienteId);

    boolean existsByMesaId(Long mesaId);

    @Query("""
            SELECT COUNT(r) > 0
            FROM Reserva r
            WHERE r.mesa.id = :mesaId
              AND r.data = :data
              AND r.status <> :statusCancelada
              AND r.horaInicio < :horaFim
              AND r.horaFim > :horaInicio
            """)
    boolean existsConflitoHorario(
            @Param("mesaId") Long mesaId,
            @Param("data") LocalDate data,
            @Param("horaInicio") LocalTime horaInicio,
            @Param("horaFim") LocalTime horaFim,
            @Param("statusCancelada") StatusReserva statusCancelada
    );
}