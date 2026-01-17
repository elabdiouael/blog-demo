package com.blog.backend.controller;

import com.blog.backend.dto.CommentDTO;
import com.blog.backend.entity.Comment;
import com.blog.backend.entity.Post;
import com.blog.backend.entity.User;
import com.blog.backend.repository.CommentRepository;
import com.blog.backend.repository.PostRepository;
import com.blog.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000") // Bach Next.js yhdar m3ah
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. Jib les commentaires dyal wa7d l post
    @GetMapping("/post/{postId}")
    public List<CommentDTO> getCommentsByPost(@PathVariable Long postId) {
        return commentRepository.findByPostId(postId).stream().map(comment -> {
            CommentDTO dto = new CommentDTO();
            dto.setId(comment.getId());
            dto.setContent(comment.getContent());
            dto.setUsername(comment.getAuthorName());
            dto.setCreatedAt(comment.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }

    // 2. Zid commentaire jdid
    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CommentDTO commentDTO) {
        return postRepository.findById(commentDTO.getPostId()).map(post -> {
            Comment comment = new Comment();
            comment.setContent(commentDTO.getContent());
            comment.setPost(post);
            comment.setAuthorName(commentDTO.getUsername());
            comment.setCreatedAt(LocalDateTime.now());

            // Ila kan user connecté (Optionnel, 7it frontend kaysift username)
            // if(commentDTO.getUsername() != null) { ... }

            commentRepository.save(comment);
            return ResponseEntity.ok("Commentaire ajouté avec succès");
        }).orElse(ResponseEntity.badRequest().body("Post introuvable"));
    }

    // 3. DELETE COMMENT (Hadi hiya li zedna bach tmsse7)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        return commentRepository.findById(id).map(comment -> {
            commentRepository.delete(comment);
            return ResponseEntity.ok().body("Commentaire supprimé");
        }).orElse(ResponseEntity.notFound().build());
    }
}