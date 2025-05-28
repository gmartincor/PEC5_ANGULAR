import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RickMortyService } from '../../services/rick-morty.service';
import { Character } from '../../models/character';
import { CardBaseComponent } from '../../components/card-base/card-base.component';
import { GridBaseComponent } from '../../components/grid-base/grid-base.component';
import { trigger, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CardBaseComponent,
    GridBaseComponent
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  isLoading = true;
  viewMode: 'cards' | 'table' = 'cards';

  constructor(
    private rickMortyService: RickMortyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.rickMortyService.getCharacters().subscribe({
      next: (characters) => {
        this.characters = characters;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.isLoading = false;
      }
    });
  }

  onCharacterClick(characterId: number): void {
    this.router.navigate(['/character', characterId]);
  }

  setViewMode(mode: 'cards' | 'table'): void {
    this.viewMode = mode;
  }
}
