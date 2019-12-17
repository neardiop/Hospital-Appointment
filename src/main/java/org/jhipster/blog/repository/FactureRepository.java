package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Facture;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Facture entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

    @Query("select facture from Facture facture where facture.user.login = ?#{principal.username}")
    List<Facture> findByUserIsCurrentUser();

}
