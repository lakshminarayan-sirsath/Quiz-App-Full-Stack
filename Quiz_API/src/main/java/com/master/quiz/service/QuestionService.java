package com.master.quiz.service;

import com.master.quiz.entity.QuizQuestion;
import com.master.quiz.repo.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    QuestionRepo questionRepo;

    // get all
    public List<QuizQuestion> getAllQuestions()
    {
        List<QuizQuestion> questionRepoAll = questionRepo.findAll();
        return questionRepoAll;
    }

    // save one
    public QuizQuestion saveQuestion(QuizQuestion question){
        QuizQuestion save = questionRepo.save(question);
        return save;
    }

    // save all
    public List<QuizQuestion> saveQuestions(List<QuizQuestion> questions) {
        return questionRepo.saveAll(questions);
    }

    // get by type
    public List<QuizQuestion> getQuestionsByQuizType(String quizType) {
        return questionRepo.findByQuizType(quizType);
    }

//    // Get questions by quiz type
//    public List<QuizQuestion> getQuestionsByQuizType(String quizType) {
//        List<QuizQuestion> questions = questionRepo.findByQuizType(quizType);
//
//        // Select 5 random questions
//        if (questions.size() > 5) {
//            return questions.stream()
//                    .skip((int) (questions.size() * Math.random()))
//                    .limit(5)
//                    .collect(Collectors.toList());
//        } else {
//            return questions; // If there are less than 5 questions, return all
//        }
//    }

}
