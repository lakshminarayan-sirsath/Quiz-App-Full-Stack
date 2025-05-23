package com.master.quiz.repo;

import com.master.quiz.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepo extends JpaRepository<QuizQuestion,Long> {
//    Method Naming Convention: By defining findByQuizType in the repository interface,
//    Spring Data JPA understands that it should generate a query like SELECT q FROM QuizQuestion q WHERE q.quizType = :quizType.
//    Query Derivation: Spring Data JPA translates this method into a JPQL query (SELECT q FROM QuizQuestion q WHERE q.quizType = :quizType) internally.
//    Parameter Binding: The quizType parameter from the method call is automatically bound to the query using a @Param annotation if needed
    List<QuizQuestion> findByQuizType(String quizType);

}
