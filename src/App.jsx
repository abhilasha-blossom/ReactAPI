import { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from './services/api';
import StudentForm from './components/StudentForm';

function App() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    // Fetch students on load
    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setCurrentStudent(null);
        setIsModalOpen(true);
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;

        try {
            await deleteStudent(id);
            setStudents(students.filter(s => s.id !== id));
        } catch (err) {
            alert('Failed to delete student: ' + err.message);
        }
    };

    const handleFormSubmit = async (student) => {
        try {
            if (student.id) {
                await updateStudent(student.id, student);
                setStudents(students.map(s => s.id === student.id ? student : s));
            } else {
                const newStudent = await createStudent(student);
                // If the API returns the created object with ID, use it. 
                // Otherwise re-fetch or assume success if we can't get ID easily.
                // Assuming API returns key data.
                if (newStudent && newStudent.id) {
                    setStudents([...students, newStudent]);
                } else {
                    loadStudents();
                }
            }
            setIsModalOpen(false);
        } catch (err) {
            alert('Operation failed: ' + err.message);
        }
    };

    return (
        <div className="container">
            <h1>Student Management</h1>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Student List</h2>
                    <button className="btn btn-primary" onClick={handleAdd}>
                        + Add Student
                    </button>
                </div>

                {loading && <div className="loading-container"><p>Loading...</p></div>}
                {error && <p className="error">{error}</p>}

                {!loading && students.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No students found. Add one!</p>}

                <ul className="student-list">
                    {students.map((student) => (
                        <li key={student.id} className="student-item">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="badge">
                                        {student.name ? student.name.charAt(0).toUpperCase() : '?'}
                                    </span>
                                    <div>
                                        <strong>{student.name}</strong>
                                        <span className="student-info">Age: {student.age}</span>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className="btn btn-icon" onClick={() => handleEdit(student)} title="Edit">
                                        ✎
                                    </button>
                                    <button className="btn btn-icon" onClick={() => handleDelete(student.id)} title="Delete" style={{ color: '#ef4444' }}>
                                        🗑
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <StudentForm
                    student={currentStudent}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default App;
