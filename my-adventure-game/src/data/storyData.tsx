import { StoryNode, CombatNode } from '../types/game'

export const storyData: Record<string, StoryNode | CombatNode> = {
  "menu": {
    id: "menu",
    type: "menu",
    text: "Welcome to the Mini Adventure!",
    choices: [{ text: "Start Game", nextNode: "fork_road" }],
    background: "/images/tavern.jpg",
    music: '/music/title.mp3'
  },
  "fork_road": {
    id: "fork_road",
    type: "story",
    text: "You find yourself at a fork in the road. To the left is a dark, mysterious cave. To the right is a sunny meadow path.",
    choices: [
      { text: "Enter the cave", nextNode: "goblin_combat" },
      { text: "Take the meadow path", nextNode: "meadow_victory" }
    ],
    background: "/images/fork.jpg"
  },
  "goblin_combat": {
    id: "goblin_combat",
    type: "combat",
    text: "You encounter a fierce goblin in the cave!",
    choices: [],
    background: "/images/cave.webp",
    enemy: {
      name: "Goblin",
      image: "/images/goblin.png",
      maxHealth: 6,
      damage: {
        min: 1,
        max: 3
      }
    }
  },
  "combat_victory": {
    id: "combat_victory",
    type: "ending",
    ending_type: "victory",
    text: "You defeated the goblin, you win!",
    choices: [{ text: "Play Again", nextNode: "menu" }],
    background: "/images/victory.jpg"
  },
  "meadow_victory": {
    id: "meadow_victory",
    type: "ending",
    ending_type: "victory",
    text: "You walk along the beautiful meadow path and find a treasure chest full of gold! Congratulations, you've won!",
    choices: [{ text: "Play Again", nextNode: "menu" }],
    background: "/images/meadow.jpg"
  }
} as const