import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../models/character';

@Component({
  selector: 'app-card-base',
  standalone: true,
  imports: [CommonModule, MatCardModule],
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
