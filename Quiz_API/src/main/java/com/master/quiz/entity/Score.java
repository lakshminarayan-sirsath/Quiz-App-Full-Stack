package com.master.quiz.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "scores")
@Data
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference // Prevents infinite recursion
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Link to the User entity

    @Column(nullable = false)
    private String quizType;

    @Column(nullable = false)
    private int score;

    @Column(name = "date_taken", nullable = false)
    private Timestamp dateTaken = new Timestamp(System.currentTimeMillis());
}
