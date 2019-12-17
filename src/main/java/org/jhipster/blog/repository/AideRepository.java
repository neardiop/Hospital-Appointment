package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Aide;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Aide entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AideRepository extends JpaRepository<Aide, Long> {

    @Query("select aide from Aide aide where aide.user.login = ?#{principal.username}")
    List<Aide> findByUserIsCurrentUser();

}
