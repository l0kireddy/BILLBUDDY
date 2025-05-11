// BB/service/UserService.java
package BB.service;

import BB.model.User;

public interface UserService {
    User saveUser(User user);
    User findByEmail(String email);
    String validateUser(String email, String password);
}