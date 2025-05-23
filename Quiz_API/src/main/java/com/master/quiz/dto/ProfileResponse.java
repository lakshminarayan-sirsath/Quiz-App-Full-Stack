package com.master.quiz.dto;

import com.master.quiz.entity.Score;
import lombok.Data;

import java.util.List;

@Data
public class ProfileResponse {
    private Long userId;
    private String firstname;
    private String lastname;
    private String email;
    private List<Score> scores;

}
