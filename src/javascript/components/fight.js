import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        let id1;
        let id2;
        const pressedKeys = {};
        firstFighter.isBlocked = false;
        secondFighter.isBlocked = false;
        
        document.addEventListener('keydown', function(e){
            pressedKeys[e.code] = true;
            if (e.code == controls.PlayerOneBlock) {
                firstFighter.isBlocked = true;
            }
            if (e.code == controls.PlayerTwoBlock) {
                secondFighter.isBlocked = true;
            }
            
            if (!id1 && pressedKeys[controls.PlayerOneCriticalHitCombination[0]] && pressedKeys[controls.PlayerOneCriticalHitCombination[1]] && pressedKeys[controls.PlayerOneCriticalHitCombination[2]]) {
                secondFighter.health -= 2 * firstFighter.attack;
                id1 = setTimeout(()=>{
                    id1 = null;
                },10000);
                console.log(secondFighter.health);
            }
            
            if (!id2 && pressedKeys[controls.PlayerTwoCriticalHitCombination[0]] && pressedKeys[controls.PlayerTwoCriticalHitCombination[1]] && pressedKeys[controls.PlayerTwoCriticalHitCombination[2]]) {
                firstFighter.health -= 2 * secondFighter.attack;
                id2 = setTimeout(()=>{
                    id2 = null;
                },10000);
                console.log(firstFighter.health);
            }
        })
        
        document.addEventListener('keyup',function(e){
            if (e.code == controls.PlayerOneAttack && !firstFighter.isBlocked && !secondFighter.isBlocked) {
                secondFighter.health -= getHitPower(firstFighter);
                console.log(secondFighter.health);
            } else if (e.code == controls.PlayerOneAttack && !firstFighter.isBlocked && secondFighter.isBlocked) {
                secondFighter.health -= getDamage(firstFighter,secondFighter);
                console.log(secondFighter.health);
            }
        
            if (e.code == controls.PlayerTwoAttack && !secondFighter.isBlocked && !firstFighter.isBlocked) {
                firstFighter.health -= getHitPower(secondFighter);
                console.log(firstFighter.health);
            } else if (e.code == controls.PlayerTwoAttack && !secondFighter.isBlocked && firstFighter.isBlocked) {
                firstFighter.health -= getDamage(secondFighter,firstFighter);
                console.log(firstFighter.health);
            }
        
            if (e.code == controls.PlayerOneBlock) {
                firstFighter.isBlocked = false;
            }
            if (e.code == controls.PlayerTwoBlock) {
                secondFighter.isBlocked = false;
            }
            pressedKeys[e.code] = false;
        });
    });
}

export function getDamage(attacker, defender) {
    // return damage
    const damage = getHitPower(attacker)-getBlockPower(defender);
    return damage>0 ? damage : 0;
}

export function getHitPower(fighter) {
    // return hit power
    const { attack } = fighter;
    const criticalHitChance = Math.random() + 1;
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const { defense } = fighter;
    const dodgeChance = Math.random() + 1;
    return defense * dodgeChance;
}