package BB.controller;

import BB.dto.GroupRequest;
import BB.model.Group;
import BB.repository.GroupRepository;
import BB.security.JwtUtil;
import BB.service.GroupService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/groups")
@CrossOrigin(origins = "http://localhost:5173")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private GroupRepository groupRepository;

    @PostMapping
    public Group createGroup(@RequestBody GroupRequest request, HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization").substring(7); // remove "Bearer "
        String email = jwtUtil.extractEmail(token);
        return groupService.createGroup(request.getName(), email); // ✅ This must return a Group object
    }
    @PostMapping("/{groupId}/add-member")
    public Group addMember(@PathVariable Long groupId, @RequestParam String memberEmail) {
        return groupService.addMember(groupId, memberEmail);
    }

    @GetMapping
    public List<Group> getGroupsForUser(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        return groupRepository.findByCreatedBy(email);
    }
    @DeleteMapping("/{groupId}/remove-member")
    public Group removeMember(@PathVariable Long groupId, @RequestParam String memberEmail) {
        return groupService.removeMember(groupId, memberEmail);
    }
    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId) {
        boolean isDeleted = groupService.deleteGroup(groupId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();  // Return 204 No Content if deletion is successful
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return 404 if the group is not found
        }
    }


    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        return authHeader != null && authHeader.startsWith("Bearer ")
                ? authHeader.substring(7)
                : null;
    }
}
