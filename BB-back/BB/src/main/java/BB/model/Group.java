package BB.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "bbgroups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String createdBy;

    @ElementCollection
    @CollectionTable(name = "group_members", joinColumns = @JoinColumn(name = "group_id"))
    @Column(name = "member_email")
    private Set<String> members = new HashSet<>();

    // Constructors
    public Group() {}

    public Group(String name, String createdBy) {
        this.name = name;
        this.createdBy = createdBy;
    }

    // Getters and setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public Set<String> getMembers() { return members; }
    public void setMembers(Set<String> members) { this.members = members; }

    public void addMember(String email) { this.members.add(email); }
}
