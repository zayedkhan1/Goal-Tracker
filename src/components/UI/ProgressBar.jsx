const ProgressBar = ({ progress, isCompleted }) => {
  const getColor = () => {
    if (isCompleted) return 'bg-green-500';
    if (progress > 75) return 'bg-red-500';
    if (progress > 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${getColor()}`}
        style={{ width: `${isCompleted ? 100 : progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar; // Add this line