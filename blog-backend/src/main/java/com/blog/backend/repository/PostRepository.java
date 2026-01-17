package com.blog.backend.repository;

import com.blog.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategoryId(Long categoryId); // Bach njibo les posts dyal category we7da
    List<Post> findByTitleContaining(String title); // Bach ndiro recherche
}