package com.teresa.Anos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.teresa.Anos.model.User;
import com.teresa.Anos.repository.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/add-user")
    public @ResponseBody User saveUser(@RequestBody User user){
		
        //return new ApiResponse<>(HttpStatus.OK.value(), "User saved successfully.",userService.save(user));
		
		System.out.println("stampame lo user " + user);
		
		userRepository.save(user);

		return user;
    }
	@PostMapping("/login-user")
    public @ResponseBody User loginUser(@RequestBody User user){
		
		User u = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
		
		System.out.println("STAMPO IL TIZIO RECUPERATO " + u);
		
		return u;
    }

	@GetMapping("/{id}")
    public @ResponseBody User getUser(@PathVariable int id) {
		
		System.out.println("stampame lo user " + userRepository.findById(id).get());
		
		return userRepository.findById(id).get();
        
    }
	
	@PostMapping("/tabella")
	public @ResponseBody List<User> tabellaDatiDellUtente() {
		
	   List<User> tableUser = (List<User>) userRepository.findAll();
	   
	    return tableUser;
	}
	
}

