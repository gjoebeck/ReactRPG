interface HealthBarProps {
    current: number
    max: number
    label: string
  }
  
  export const HealthBar = ({ current, max, label }: HealthBarProps) => {
    const percentage = (current / max) * 100
    
    return (
      <div className="w-48">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-medium">{current}/{max}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full ${current > max/2 ? 'bg-green-600' : current > max/4 ? 'bg-yellow-400' : 'bg-red-600'} transition-all duration-500`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }