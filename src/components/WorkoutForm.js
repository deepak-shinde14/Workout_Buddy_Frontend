import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]); // Corrected typo

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, load, reps };

        const response = await fetch('https://workout-buddy-backend-0u0y.onrender.com/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(Array.isArray(json.emptyFields) ? json.emptyFields : []); // Validate response
        }

        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('A New Workout Added', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={(emptyFields || []).includes('title') ? 'error' : ''}
            />

            <label>Load (kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={(emptyFields || []).includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={(emptyFields || []).includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;
