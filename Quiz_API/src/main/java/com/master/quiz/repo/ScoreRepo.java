package com.master.quiz.repo;

import com.master.quiz.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepo extends JpaRepository<Score, Long> {
    List<Score> findByUserId(Long userId);
}
