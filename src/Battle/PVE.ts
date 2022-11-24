import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  private _player: Fighter;
  private _monsters: SimpleFighter[];

  constructor(player: Fighter, monsters: SimpleFighter[]) {
    super(player);
    this._player = player;
    this._monsters = monsters;
  }

  override fight(): number {
    const alive = (monster: SimpleFighter) => monster.lifePoints > 0;
    while (this._player.lifePoints > 0 && this._monsters.some(alive)) {
      this._monsters.forEach((monster) => {
        if (monster.lifePoints > 0) {
          this._player.attack(monster);
          monster.attack(this._player);
        }
      });
    }
    return super.fight();
  }
}