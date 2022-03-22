import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameResolver } from './component/game/game.resolver';
import { GameComponent } from './component/game/game.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GameComponent,
    resolve: { data: GameResolver }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
