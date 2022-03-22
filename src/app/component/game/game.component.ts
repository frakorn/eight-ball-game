
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transition, trigger, style, animate } from '@angular/animations';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

@Component({
  selector: 'app-tame',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    fadeIn
  ]
})
export class GameComponent {

  data;
  winner: Winner= <Winner>{};
  ballNumberToWin: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    this.ballNumberToWin = this.data.config!.balls!.filter(b => b.type==='spot').length;
  }

  getBallNumber(pocketId,ballId){
    const stepInfo = this.data.match.find(match => match.ballId === ballId);
    return stepInfo.pocketID === pocketId ? this.data.config.balls.findIndex(b => b.id === ballId)+1 : '';
  }

  getBallColor(ballId){
    return this.data.config.balls.find(b => b.id === ballId)!.color;
  }

  getWinner(){
    const lastTimeStamp = this.data.sortedTimestamp[this.data.sortedTimestamp.length-1];
    const lastBall = this.data.timestamps[lastTimeStamp]
    if(lastBall==='ball8')
      this.checkWinner();
  }

  checkWinner(){
    const playerId = this.data.match.find(m => m.ballId === 'ball8')!.playerId;
    const hasWinner = this.data.match.map(m => ({...m, ...this.data.config.balls.find(b => b.id === m.ballId)})).
                      filter(obj => obj.playerId === playerId && (obj.type==='stripe' || obj.type==='spot')).length === this.ballNumberToWin;
    this.winner = { status: hasWinner ? true: false, name:hasWinner ? playerId : 'No Winners' };
    if(!this.winner.status)
      alert("No winners, try again");
  }
}

export interface Winner {
  status: boolean;
  name: string;
}