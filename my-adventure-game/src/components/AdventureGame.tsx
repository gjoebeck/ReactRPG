import { useState } from 'react'
import { CombatState, CombatNode } from '../types/game'
import { storyData } from '../data/storyData'
import { CombatScene } from './game/CombatScene'
import BackgroundMusic from './game/BackgroundMusic';

export const AdventureGame = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('menu')
  const [combat, setCombat] = useState<CombatState>({
    isActive: false,
    playerHealth: 10,
    goblinHealth: 6,
    maxPlayerHealth: 10,
    maxGoblinHealth: 6,
    currentTurn: 'none',
    combatLog: '',
    combatPhase: 'init',
    currentMenu: 'none'
  })

  const currentNode = storyData[currentNodeId]

  // Initialize combat when entering a combat node
  if (currentNodeId === 'goblin_combat' && !combat.isActive) {
    const combatNode = storyData[currentNodeId] as CombatNode
    setCombat(prev => ({ 
      ...prev, 
      isActive: true,
      goblinHealth: combatNode.enemy.maxHealth,
      maxGoblinHealth: combatNode.enemy.maxHealth,
      combatPhase: 'player_menu',
      currentMenu: 'main',
      combatLog: `You encounter a fierce ${combatNode.enemy.name}!` 
    }))
  }

  const getButtonStyle = (nextNodeId: string) => {
    const nextNode = storyData[nextNodeId]
    if (currentNode.type === 'menu') return 'bg-blue-600 hover:bg-blue-700'
    if (nextNode.type === 'ending') {
      return nextNode.ending_type === 'victory' 
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-red-600 hover:bg-red-700'
    }
    return 'bg-blue-600 hover:bg-blue-700'
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${currentNode.background})` }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <BackgroundMusic 
      audioUrl={currentNode.music || "/default-music.mp3"}  // You'll need to add music to your node data
      autoPlay={true}
      loop={true}
      initialVolume={0.3}
    />

      {/* Main content container */}
      <div className="relative max-w-2xl mx-auto pt-8 px-6 pb-6">
        <div className="bg-white/90 rounded-lg shadow-lg p-6">
          {currentNode.type === 'menu' && (
            <h1 className="text-4xl font-bold text-center mb-6">
              Choose Your Own Adventure
            </h1>
          )}
          
          <p className="text-lg text-center mb-8">{currentNode.text}</p>
          
          {currentNode.type === 'combat' && (
            <CombatScene
              node={currentNode as CombatNode}
              combat={combat}
              setCombat={setCombat}
              onCombatEnd={() => setCurrentNodeId('combat_victory')}
            />
          )}
          
          {currentNode.choices.length > 0 && (
            <div className="flex flex-col items-center space-y-6">
              {currentNode.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNodeId(choice.nextNode)}
                  className={`
                    px-8 py-4 rounded-lg font-medium min-w-[200px] text-white
                    ${getButtonStyle(choice.nextNode)}
                    transition-colors duration-200
                  `}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdventureGame