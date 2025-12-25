const API_URL = 'https://localhost:7138/api/Student';

export const getStudents = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch students');
    return await response.json();
};

export const createStudent = async (student) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Failed to create student');
    return await response.json();
};

export const updateStudent = async (id, student) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Failed to update student');
    // PUT usually returns 204 No Content, but sometimes the updated object.
    // We'll return true to indicate success if we don't get JSON.
    if (response.status === 204) return true;
    return await response.json();
};

export const deleteStudent = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return true;
};
