// services/groupService.js
const API_URL = 'http://localhost:8080/groups';

export const createGroup = async (groupName, token) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: groupName }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to create group');
    }
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

export const addMember = async (groupId, memberEmail, token) => {
  try {
    const response = await fetch(`${API_URL}/${groupId}/add-member?memberEmail=${encodeURIComponent(memberEmail)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const text = await response.text(); // Read full response content
    console.log('Response status:', response.status);
    console.log('Response text:', text);

    if (response.ok) {
      return JSON.parse(text);
    } else {
      throw new Error('Failed to add member');
    }
  } catch (error) {
    console.error('Error adding member:', error);
    throw error;
  }
};


export const deleteGroup = async (groupId, token) => {
  try {
    const response = await fetch(`${API_URL}/groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;  // Successfully deleted
    } else {
      throw new Error('Failed to delete group');
    }
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;  // Propagate error to be caught in GroupPage
  }
};
