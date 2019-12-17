package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Rendezvous;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Rendezvous entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RendezvousRepository extends JpaRepository<Rendezvous, Long> {

    @Query("select rendezvous from Rendezvous rendezvous where rendezvous.user.login = ?#{principal.username}")
    List<Rendezvous> findByUserIsCurrentUser();

}
