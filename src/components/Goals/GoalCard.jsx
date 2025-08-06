import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiClock, FiFlag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ProgressBar from '../UI/ProgressBar';


const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
};

const GoalCard = ({ goal, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({ ...goal });
  
  const dueDate = new Date(goal.deadline);
  const now = new Date();
  const timeLeft = dueDate - now;
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  
  const progress = Math.max(0, Math.min(100, 100 - (daysLeft / 30) * 100));
  
  const handleUpdate = () => {
    onUpdate(goal.id, editedGoal);
    setIsEditing(false);
  };
  
  const priorityClass = priorityColors[goal.priority] || priorityColors.medium;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ${goal.completed ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}`}
    >
      <div className="p-5">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editedGoal.title}
              onChange={(e) => setEditedGoal({...editedGoal, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <textarea
              value={editedGoal.description}
              onChange={(e) => setEditedGoal({...editedGoal, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              rows="3"
            />
            <div className="flex space-x-2">
              <select
                value={editedGoal.priority}
                onChange={(e) => setEditedGoal({...editedGoal, priority: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <input
                type="date"
                value={editedGoal.deadline.split('T')[0]}
                onChange={(e) => setEditedGoal({...editedGoal, deadline: e.target.value})}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-3">
              <h3 className={`text-lg font-semibold ${goal.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
                {goal.title}
              </h3>
              {goal.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${priorityClass}`}>
                  {goal.priority}
                </span>
              )}
            </div>
            
            {goal.description && (
              <p className={`text-gray-600 dark:text-gray-300 mb-4 ${goal.completed ? 'line-through' : ''}`}>
                {goal.description}
              </p>
            )}
            
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                <FiClock className="mr-1" />
                <span>Due: {dueDate.toLocaleDateString()}</span>
                <span className="ml-2 font-medium">
                  {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today' : 'Overdue'}
                </span>
              </div>
              <ProgressBar progress={progress} isCompleted={goal.completed} />
            </div>
            
            {goal.tags && goal.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {goal.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => onToggleComplete(goal.id)}
                className={`flex items-center px-3 py-1 rounded-lg ${goal.completed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >
                <FiCheck className="mr-1" />
                {goal.completed ? 'Completed' : 'Mark Complete'}
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default GoalCard;