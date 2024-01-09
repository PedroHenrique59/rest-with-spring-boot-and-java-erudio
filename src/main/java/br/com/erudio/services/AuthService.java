package br.com.erudio.services;

import br.com.erudio.data.vo.v1.security.AccountCredentialsVO;
import br.com.erudio.data.vo.v1.security.TokenVO;
import br.com.erudio.repositories.UserRepository;
import br.com.erudio.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity signin(AccountCredentialsVO data) {
        try {
            var username = data.getUsername();
            var password = data.getPassword();

            //Realiza a busca do usuario pelo username e depois valida a senha, se ela da match com a senha criptografada do banco
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            var user = userRepository.findByUsername(username);

            var tokenResponse = new TokenVO();

            if (user != null) {
                tokenResponse = tokenProvider.createAccessToken(username, user.getRoles());
            } else {
                throw new UsernameNotFoundException("Username: " + username + "not found!");
            }

            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username/password supplied!");
        }
    }

    public ResponseEntity refreshToken(String username, String refreshToken) {

        var user = userRepository.findByUsername(username);

        var tokenResponse = new TokenVO();

        if (user != null) {
            tokenResponse = tokenProvider.refreshToken(refreshToken);
        } else {
            throw new UsernameNotFoundException("Username: " + username + "not found!");
        }

        return ResponseEntity.ok(tokenResponse);
    }

}
