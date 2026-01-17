package com.blog.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty; // <-- Import hada

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String authorName;
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "post_id")
    // FIX: Bedelna @JsonIgnore b hadchi bach y9ra l ID mn Frontend
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Post post;
}