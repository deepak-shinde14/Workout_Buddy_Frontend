import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

//componets
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm"


const Home = () => {
    
    const {workouts, dispatch} =useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('https://workout-buddy-backend-0u0y.onrender.com/api/workouts');
            const json = await response.json();
            if (response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />

        </div>
    )
}

export default Home