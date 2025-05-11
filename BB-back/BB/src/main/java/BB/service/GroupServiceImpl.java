package BB.service;


import BB.model.Group;
import BB.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Override
    public Group createGroup(String name, String createdBy) {
        Group group = new Group(name, createdBy);
        group.addMember(createdBy);
        return groupRepository.save(group);
    }

    @Override
    public Group addMember(Long groupId, String memberEmail) {
        Group group = groupRepository.findById(groupId)
            .orElseThrow(() -> new RuntimeException("Group not found"));
        group.addMember(memberEmail);
        return groupRepository.save(group);
    }
    public Group removeMember(Long groupId, String memberEmail) {
        Group group = groupRepository.findById(groupId)
            .orElseThrow(() -> new RuntimeException("Group not found"));

        group.getMembers().removeIf(email -> email.equals(memberEmail));
        return groupRepository.save(group);
    }
    @Override
    public boolean deleteGroup(Long groupId) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isPresent()) {
            groupRepository.deleteById(groupId);
            return true;
        } else {
            return false;
        }
    }



    @Override
    public List<Group> getGroupsByUser(String email) {
        return groupRepository.findByCreatedBy(email);
    }
}
