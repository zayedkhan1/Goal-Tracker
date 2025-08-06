import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useGoals } from '../hooks/useGoals';
import Header from '../components/Layout/Header';
import AddGoal from '../components/Goals/AddGoal';
import GoalList from '../components/Goals/GoalList';
import GoalFilters from '../components/Goals/GoalFilters';
import Confetti from '../components/UI/Confetti';

const Dashboard = () => {
  const { user, showConfetti } = useAppContext();
  const navigate = useNavigate();
  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleComplete,
    setFilter,
    setSearchQuery,
    filter,
    searchQuery,
    stats
  } = useGoals();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Confetti show={showConfetti} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AddGoal onAdd={addGoal} />
          <GoalFilters
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            stats={stats}
          />
          <GoalList
            goals={goals}
            onUpdate={updateGoal}
            onDelete={deleteGoal}
            onToggleComplete={toggleComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;