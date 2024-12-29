import { useEffect } from 'react'
import { CombatState, CombatNode } from '../../types/game'
import { HealthBar } from './HealthBar'
import { CombatMenu } from './CombatMenu'
import { rollDice } from '../../utils/combat'

interface CombatSceneProps {
  node: CombatNode
  combat: CombatState
  setCombat: (value: React.SetStateAction<CombatState>) => void
  onCombatEnd: () => void
}

export const CombatScene = ({ 
  node, 
  combat, 
  setCombat, 
  onCombatEnd 
}: CombatSceneProps) => {
  const handleCombatAction = async (action: string) => {
    switch (action) {
      case 'items':
        setCombat(prev => ({ 
          ...prev, 
          currentMenu: 'main', 
          combatLog: 'No items available yet!' 
        }))
        break
      case 'attack':
        setCombat(prev => ({ ...prev, currentMenu: 'attack' }))
        break
      case 'magic':
        setCombat(prev => ({ ...prev, currentMenu: 'magic' }))
        break
      case 'run':
        setCombat(prev => ({ 
          ...prev, 
          combatPhase: 'ended', 
          combatLog: 'You successfully run away!' 
        }))
        break
      case 'basic_attack':
        const damage = rollDice(2, 5)
        const newGoblinHealth = Math.max(0, combat.goblinHealth - damage)
        
        setCombat(prev => ({
          ...prev,
          goblinHealth: newGoblinHealth,
          combatLog: `You hit the goblin for ${damage} damage!`,
          currentMenu: 'none',
          combatPhase: newGoblinHealth > 0 ? 'executing' : 'ended',
          currentTurn: newGoblinHealth > 0 ? 'goblin' : 'none'
        }))
        break
      case 'fireball':
        const fireballDamage = rollDice(3, 6)
        const goblinHealthAfterFire = Math.max(0, combat.goblinHealth - fireballDamage)
        
        setCombat(prev => ({
          ...prev,
          goblinHealth: goblinHealthAfterFire,
          combatLog: `Your fireball hits the goblin for ${fireballDamage} damage!`,
          currentMenu: 'none',
          combatPhase: goblinHealthAfterFire > 0 ? 'executing' : 'ended',
          currentTurn: goblinHealthAfterFire > 0 ? 'goblin' : 'none'
        }))
        break
    }
  }

  const handleGoblinTurn = () => {
    const damage = rollDice(1, 3)
    const newPlayerHealth = Math.max(0, combat.playerHealth - damage)
    
    setCombat(prev => ({
      ...prev,
      playerHealth: newPlayerHealth,
      combatLog: `The goblin hits you for ${damage} damage!`,
      currentTurn: 'player',
      combatPhase: 'player_menu',
      currentMenu: 'main'
    }))
  }

  const handleBackMenu = () => {
    setCombat(prev => ({ ...prev, currentMenu: 'main' }))
  }

  useEffect(() => {
    if (combat.combatPhase === 'executing' && combat.currentTurn === 'goblin') {
      const timer = setTimeout(handleGoblinTurn, 2000)
      return () => clearTimeout(timer)
    }
  }, [combat.combatPhase, combat.currentTurn])

  useEffect(() => {
    if (combat.combatPhase === 'ended') {
      const timer = setTimeout(onCombatEnd, 2000)
      return () => clearTimeout(timer)
    }
  }, [combat.combatPhase, onCombatEnd])

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img 
            src={node.enemy.image}
            alt={`A fierce ${node.enemy.name}`}
            className="w-48 h-48 object-contain"
            onError={(_e) => {
              console.error('Image failed to load');
              console.log('Attempted image path:', node.enemy.image);
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-8">
        <HealthBar 
          current={combat.playerHealth} 
          max={combat.maxPlayerHealth} 
          label="Player"
        />
        <span className="text-xl font-bold">VS</span>
        <HealthBar 
          current={combat.goblinHealth} 
          max={combat.maxGoblinHealth} 
          label={node.enemy.name}
        />
      </div>
      <p className="text-center font-medium mb-6">{combat.combatLog}</p>
      {combat.combatPhase === 'player_menu' && (
        <CombatMenu 
          menuType={combat.currentMenu}
          onAction={handleCombatAction}
          onBack={handleBackMenu}
        />
      )}
    </div>
  )
}