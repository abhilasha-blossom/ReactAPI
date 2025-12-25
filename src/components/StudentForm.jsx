import { useState, useEffect } from 'react';

function StudentForm({ student, onSubmit, onCancel }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        if (student) {
            setName(student.name);
            setAge(student.age);
        } else {
            setName('');
            setAge('');
        }
    }, [student]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            id: student ? student.id : 0,
            name,
            age: parseInt(age, 10)
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            className="form-input"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            min="1"
                            max="120"
                            placeholder="Enter age"
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-icon" onClick={onCancel} style={{ fontSize: '1rem', width: 'auto' }}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {student ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentForm;
