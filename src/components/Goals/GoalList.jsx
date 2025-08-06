import { motion } from 'framer-motion';
import GoalCard from './GoalCard';

const GoalList = ({ goals, onUpdate, onDelete, onToggleComplete }) => {
  if (goals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10 text-gray-500"
      >
        <p>No goals found. Add your first goal to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-4 md:grid-cols-1 lg:grid-cols-1"
    >
      {goals.map((goal) => (
        <motion.div
          key={goal.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <GoalCard
            goal={goal}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GoalList;