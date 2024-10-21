package tp4.enit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF for APIs
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/auth/**").permitAll()    // Public access to authentication (login, register)// Protect access to tasks
                        .anyRequest().permitAll()   // Allow other requests without authentication
                )
                .formLogin(form -> form
                        .loginPage("/login")         // Custom login page
                        .permitAll()                 // Allow access to login page
                )
                .logout(logout -> logout
                        .permitAll()                 // Allow access to logout
                )
                ;
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Password encoder (BCrypt for hashing passwords)
    }
}
