package BB.service;

import BB.model.Group;
import java.util.List;

public interface GroupService {
    Group createGroup(String name, String createdBy);
    Group addMember(Long groupId, String memberEmail);
    List<Group> getGroupsByUser(String email);
    Group removeMember(Long groupId, String memberEmail);
    boolean deleteGroup(Long groupId);
}
