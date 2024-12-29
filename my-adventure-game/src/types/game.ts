export type NodeType = 'menu' | 'story' | 'ending' | 'combat'
export type EndingType = 'victory' | 'death' | null
export type CombatMenuType = 'main' | 'attack' | 'magic' | 'none'

export interface Choice {
  text: string
  nextNode: string
}

export interface Enemy {
  name: string
  image: string
  maxHealth: number
  damage: {
    min: number
    max: number
  }
}

export interface StoryNode {
  id: string
  type: NodeType
  ending_type?: EndingType
  text: string
  choices: Choice[]
  background: string
}

export interface CombatNode extends StoryNode {
  type: 'combat'
  enemy: Enemy
}

export interface CombatState {
  isActive: boolean
  playerHealth: number
  goblinHealth: number
  maxPlayerHealth: number
  maxGoblinHealth: number
  currentTurn: 'none' | 'player' | 'goblin'
  combatLog: string
  combatPhase: 'init' | 'player_menu' | 'executing' | 'ended'
  currentMenu: CombatMenuType
}