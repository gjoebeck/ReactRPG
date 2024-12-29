import { CombatMenuType } from '../../types/game'

interface CombatMenuProps {
  menuType: CombatMenuType
  onAction: (action: string) => void
  onBack: () => void
}

export const CombatMenu = ({ menuType, onAction, onBack }: CombatMenuProps) => {
  const getMenuItems = () => {
    switch (menuType) {
      case 'attack':
        return [
          { text: 'Basic Attack', action: 'basic_attack' },
          { text: '', action: '' },
          { text: '', action: '' },
          { text: 'Back', action: 'back' }
        ]
      case 'magic':
        return [
          { text: 'Fireball', action: 'fireball' },
          { text: '', action: '' },
          { text: '', action: '' },
          { text: 'Back', action: 'back' }
        ]
      default:
        return [
          { text: 'Items', action: 'items' },
          { text: 'Attack', action: 'attack' },
          { text: 'Magic', action: 'magic' },
          { text: 'Run', action: 'run' }
        ]
    }
  }

  const items = getMenuItems()

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => item.action === 'back' ? onBack() : onAction(item.action)}
          disabled={!item.text}
          className={`
            px-6 py-3 rounded-lg font-medium
            ${!item.text ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}
            transition-colors duration-200
          `}
        >
          {item.text}
        </button>
      ))}
    </div>
  )
}