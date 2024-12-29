export const rollDice = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min
  
  export const calculateDamage = (min: number, max: number) => 
    rollDice(min, max)