const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className={`${bgColor} rounded-xl shadow-md p-6 text-white transition hover:scale-105`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;