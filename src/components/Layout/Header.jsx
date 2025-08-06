import { useAppContext } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useAppContext();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          GoalSetter
        </h1>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-gray-600 dark:text-gray-300">
                Welcome, {user.name}!
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;