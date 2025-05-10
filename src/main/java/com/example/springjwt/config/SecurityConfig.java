package com.example.springjwt.config;

import com.example.springjwt.jwt.JWTFilter;
import com.example.springjwt.jwt.JWTUtil;
import com.example.springjwt.jwt.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
<<<<<<< HEAD
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        http.csrf(csrf -> csrf.disable());
        http.formLogin(form -> form.disable());
        http.httpBasic(basic -> basic.disable());

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/", "/join").permitAll()
                .requestMatchers("/admin").hasRole("ADMIN")

                .requestMatchers(HttpMethod.POST, "/api/study").authenticated()
                .requestMatchers("/api/study/**").authenticated()

                .requestMatchers(HttpMethod.POST, "/study/*/checklist").authenticated()
                .requestMatchers(HttpMethod.POST, "/study").authenticated()
                .requestMatchers(HttpMethod.GET, "/study").authenticated()
                .requestMatchers(HttpMethod.GET, "/study/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/study/**").authenticated()

                .requestMatchers(HttpMethod.PUT, "/mypage/update").authenticated()
                .requestMatchers(HttpMethod.GET, "/mypage").authenticated()

                .requestMatchers(HttpMethod.GET, "/api/study/*/feedbacks").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/study/*/feedbacks").authenticated()


                .anyRequest().authenticated()
        );

        http.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
=======
        // CORS 허용
        http.cors((cors) -> cors.configurationSource(corsConfigurationSource()));

        // CSRF, 기본 로그인/인증 disable
        http.csrf((auth) -> auth.disable());
        http.formLogin((auth) -> auth.disable());
        http.httpBasic((auth) -> auth.disable());

        // ✅ 수정된 권한 설정 (순서 중요)
        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers("/login", "/", "/join").permitAll()
                .requestMatchers("/admin").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/mypage/update").authenticated()
                .requestMatchers(HttpMethod.GET, "/mypage").authenticated()
                .requestMatchers(HttpMethod.POST, "/study").authenticated() // ⬅️ anyRequest 전으로 이동
                .anyRequest().authenticated() // ⬅️ 항상 마지막에 위치
        );

        // JWT 필터 등록 순서 조정
        http.addFilterBefore(new JWTFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        http.addFilterAt(new LoginFilter(
                authenticationManager(authenticationConfiguration),
                jwtUtil
        ), UsernamePasswordAuthenticationFilter.class);

        // 세션 설정
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );
>>>>>>> 8cf9b90d9351c5d1955dc9b209e3233900347ade

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 8cf9b90d9351c5d1955dc9b209e3233900347ade
