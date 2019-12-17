package org.jhipster.blog.repository;

import java.util.List;
import org.jhipster.blog.domain.Consultation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Consultation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
	@Query("select consultation from Consultation consultation where consultation.user.login = ?#{principal.username}")
    List<Consultation> findByUserIsCurrentUser();
	
}

