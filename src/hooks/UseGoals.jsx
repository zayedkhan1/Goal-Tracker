import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const GOAL_STORAGE_KEY = 'goalTrackerGoals';
const RETENTION_DAYS = 15;

export const useGoals = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cleanup goals older than RETENTION_DAYS
  const cleanupOldGoals = (goalsList) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);
    
    return goalsList.filter(goal => {
      try {
        const goalDate = new Date(goal.createdAt || goal.deadline);
        return goalDate >= cutoffDate;
      } catch {
        return false; // Remove if date is invalid
      }
    });
  };

  // Load goals from localStorage
  useEffect(() => {
    const loadGoals = () => {
      try {
        const savedGoals = localStorage.getItem(GOAL_STORAGE_KEY);
        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);
          const cleanedGoals = cleanupOldGoals(parsedGoals);
          setGoals(cleanedGoals);
          
          // Update storage if any goals were removed
          if (cleanedGoals.length !== parsedGoals.length) {
            localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(cleanedGoals));
          }
        }
      } catch (error) {
        console.error("Failed to load goals:", error);
        localStorage.removeItem(GOAL_STORAGE_KEY);
      }
    };
    
    loadGoals();
  }, []);

  // Save goals to localStorage when they change
  useEffect(() => {
    if (goals.length > 0 || localStorage.getItem(GOAL_STORAGE_KEY)) {
      localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(goals));
    }
  }, [goals]);

  // Check for due date reminders
  useEffect(() => {
    const now = new Date();
    const upcomingGoals = goals.filter(goal => {
      if (goal.completed) return false;
      try {
        const dueDate = new Date(goal.deadline);
        const timeDiff = dueDate - now;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff <= 2 && daysDiff >= 0;
      } catch {
        return false;
      }
    });

    upcomingGoals.forEach(goal => {
      const dueDate = new Date(goal.deadline);
      const timeDiff = dueDate - now;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        console.log(`Reminder: "${goal.title}" is due tomorrow!`);
      } else if (daysDiff === 0) {
        console.log(`Reminder: "${goal.title}" is due today!`);
      }
    });
  }, [goals]);

  const addGoal = (goalData) => {
    const newGoal = {
      id: uuidv4(),
      ...goalData,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id, updatedData) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, ...updatedData } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const toggleComplete = (id) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const filteredGoals = goals.filter(goal => {
    // Apply status filter
    if (filter === 'active' && goal.completed) return false;
    if (filter === 'completed' && !goal.completed) return false;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        goal.title.toLowerCase().includes(query) ||
        (goal.description && goal.description.toLowerCase().includes(query)) ||
        (goal.tags && goal.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });

  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.completed).length,
    active: goals.filter(g => !g.completed).length
  };

  return {
    goals: filteredGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleComplete,
    setFilter,
    setSearchQuery,
    filter,
    searchQuery,
    stats
  };
};