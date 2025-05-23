package com.master.quiz.controller;

import com.master.quiz.dto.LoginRequest;
import com.master.quiz.entity.QuizQuestion;
import com.master.quiz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class LoginController {


    @Autowired
    QuestionService questionService;

    // Hardcoded credentials for now
    private final String USERNAME = "user";
    private final String PASSWORD = "password";

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        if (USERNAME.equals(loginRequest.getUsername()) && PASSWORD.equals(loginRequest.getPassword())) {
            return "Login Successful!";
        } else {
            return "Invalid username or password";
        }
    }

     // GET ALL
    @GetMapping("/all-questions")
    public List<QuizQuestion> getQuestions() {
        return questionService.getAllQuestions();
    }

    // By Type
    @GetMapping("/questions")
    public List<QuizQuestion> getQuestions(@RequestParam String quizType) {
        return questionService.getQuestionsByQuizType(quizType);
    }

    // save one
    @PostMapping(value = "/save", consumes = "application/json", produces = "application/json")
    public QuizQuestion saveQuestion(@RequestBody QuizQuestion question) {
        return questionService.saveQuestion(question);
    }

    // save all
    @PostMapping(value = "/save_all", consumes = "application/json", produces = "application/json")
    public List<QuizQuestion> saveQuestions(@RequestBody List<QuizQuestion> questions) {
        return questionService.saveQuestions(questions);
    }

}
