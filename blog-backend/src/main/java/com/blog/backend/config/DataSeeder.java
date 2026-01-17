package com.blog.backend.config;

import com.blog.backend.entity.Category;
import com.blog.backend.entity.Comment;
import com.blog.backend.entity.Post;
import com.blog.backend.entity.User;
import com.blog.backend.repository.CategoryRepository;
import com.blog.backend.repository.CommentRepository;
import com.blog.backend.repository.PostRepository;
import com.blog.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public DataSeeder(PostRepository postRepository, CategoryRepository categoryRepository,
                      CommentRepository commentRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // 1. Clear Old Data (Optional hit ddl-auto=create ghadi ydirha, walakin bach ntkdo)
        if (postRepository.count() == 0) {

            // --- USERS ---
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");
                userRepository.save(admin);
            }

            // --- CATEGORIES ---
            Category ai = new Category(); ai.setName("Artificial Intelligence");
            Category web = new Category(); web.setName("Web Development");
            Category life = new Category(); life.setName("Lifestyle");

            // Save categories w ncheddohom bach nkhdmo bihom
            List<Category> savedCats = categoryRepository.saveAll(Arrays.asList(ai, web, life));
            Category catAI = savedCats.get(0);
            Category catWeb = savedCats.get(1);
            Category catLife = savedCats.get(2);

            // --- POSTS ---
            Post p1 = new Post();
            p1.setTitle("The Future of AI in Morocco");
            p1.setDescription("How artificial intelligence is transforming industries in North Africa.");
            p1.setContent("AI is growing fast... \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.");
            p1.setImageUrl("https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800");
            p1.setCategory(catAI);

            Post p2 = new Post();
            p2.setTitle("Mastering Next.js 16 & Spring Boot");
            p2.setDescription("A complete guide to building full-stack apps like a pro.");
            p2.setContent("Step 1: Setup Spring Boot... \nStep 2: Setup Next.js...");
            p2.setImageUrl("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800");
            p2.setCategory(catWeb);

            Post p3 = new Post();
            p3.setTitle("Why Chess Improves Coding Skills");
            p3.setDescription("Strategic thinking in chess directly translates to software architecture.");
            p3.setContent("Grandmasters think patterns, developers think algorithms...");
            p3.setImageUrl("https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800");
            p3.setCategory(catLife);

            postRepository.saveAll(Arrays.asList(p1, p2, p3));

            // --- COMMENTS ---
            Comment c1 = new Comment();
            c1.setAuthorName("Saad");
            c1.setContent("Nadi a bro! Hadchi wa3r.");
            c1.setPost(p2);

            Comment c2 = new Comment();
            c2.setAuthorName("Wiam");
            c2.setContent("Chess is life ❤️");
            c2.setPost(p3);

            commentRepository.saveAll(Arrays.asList(c1, c2));

            System.out.println("✅ Database Refreshed with New Data!");
        }
    }
}