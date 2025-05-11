import React, { useState, useEffect } from 'react';
import { createGroup, addMember, deleteGroup } from '../services/groupService';
import './GroupPage.css';

const GroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [memberEmail, setMemberEmail] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  // Function to fetch groups from backend
  const fetchGroups = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:8080/groups', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGroups(data);
      } else {
        console.error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Fetch groups when the component mounts
  useEffect(() => {
    fetchGroups();
  }, []); // Empty array ensures this runs only once when component mounts

  // Create group function
  const handleCreateGroup = async () => {
    if (!groupName.trim()) return; // Validate the group name before making the request

    const token = localStorage.getItem('token'); // JWT stored after login
    try {
      const response = await fetch('http://localhost:8080/groups', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: groupName }),
      });

      if (response.ok) {
        // Fetch groups again to ensure the list is updated
        fetchGroups();
        setGroupName(''); // Clear the input after successful creation
      } else {
        alert('Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  // Add member function
  const handleAddMember = async () => {
    if (!memberEmail.trim() || selectedGroupIndex === null) return;

    const token = localStorage.getItem('token');
    const groupId = groups[selectedGroupIndex].id;
    try {
      const updatedGroup = await addMember(groupId, memberEmail, token);
      const updatedGroups = [...groups];
      updatedGroups[selectedGroupIndex] = updatedGroup;
      setGroups(updatedGroups);
      setMemberEmail('');
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member');
    }
  };

  // Delete group function
const handleDeleteGroup = async (index) => {
  const groupId = groups[index].id;
  const token = localStorage.getItem('token');
  try {
    const success = await deleteGroup(groupId, token);  // Pass the groupId and token to deleteGroup
    if (success) {
      const updatedGroups = groups.filter((_, i) => i !== index);
      setGroups(updatedGroups);  // Update groups state after successful deletion
    }
  } catch (error) {
    console.error('Error deleting group:', error);
    alert('Failed to delete group');
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h2>Group Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={handleCreateGroup}>Create Group</button>
      </div>

      {groups.map((group, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '15px',
            position: 'relative',
          }}
        >
          <h4>{group.name}</h4>
          <p>Members: {group.members.join(', ') || 'No members yet'}</p>
          <input
            type="text"
            placeholder="Enter Member Email"
            value={selectedGroupIndex === index ? memberEmail : ''}
            onChange={(e) => {
              setSelectedGroupIndex(index);
              setMemberEmail(e.target.value);
            }}
          />
          <button onClick={handleAddMember}>Add Member</button>

          <button
            onClick={() => handleDeleteGroup(index)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Delete Group
          </button>
        </div>
      ))}
    </div>
  );
};

export default GroupPage;
