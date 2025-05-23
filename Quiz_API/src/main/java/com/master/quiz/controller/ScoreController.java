package com.master.quiz.controller;

import com.master.quiz.dto.ProfileResponse;
import com.master.quiz.entity.Score;
import com.master.quiz.entity.User;
import com.master.quiz.service.ScoreService;
import com.master.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @Autowired
    private UserService userService; // Inject UserService

    @PostMapping("/save")
    public Score saveScore(@RequestBody Score score) {
        return scoreService.saveScore(score.getUser().getId(), score.getQuizType(), score.getScore());
    }

    @GetMapping("/{userId}")
    public List<Score> getScoresByUserId(@PathVariable Long userId) {
        return scoreService.getScoresByUserId(userId);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }


}
