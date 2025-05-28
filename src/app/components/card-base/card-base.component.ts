import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../models/character';

@Component({
  selector: 'app-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.scss']
})
export class CardBaseComponent {
  @Input() character!: Character;
  @Output() cardClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.character.id);
  }
}
