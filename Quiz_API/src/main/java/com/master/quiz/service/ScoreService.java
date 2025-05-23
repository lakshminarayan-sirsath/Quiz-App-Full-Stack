package com.master.quiz.service;

import com.master.quiz.entity.Score;
import com.master.quiz.entity.User;
import com.master.quiz.repo.ScoreRepo;
import com.master.quiz.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepo scoreRepository;

    @Autowired
    private UserRepo userRepository;

    public List<Score> getScoresByUserId(Long userId) {
        return scoreRepository.findByUserId(userId);
    }

    public Score saveScore(Long userId, String quizType, int score) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Score newScore = new Score();
        newScore.setUser(user); // Link score to user
        newScore.setQuizType(quizType);
        newScore.setScore(score);
        return scoreRepository.save(newScore);
    }
}
