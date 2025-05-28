import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RickMortyService } from '../../services/rick-morty.service';
import { Character } from '../../models/character';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface InfoNode {
  name: string;
  children?: InfoNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  animations: [
    trigger('detailsAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('600ms ease-out'))
    ])
  ]
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  isLoading = true;
  showDetails = false;
  detailsState = 'hidden';
  
  // Material Tree configuration
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  
  treeFlattener = new MatTreeFlattener(
    (node: InfoNode, level: number) => ({
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    }),
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rickMortyService: RickMortyService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCharacter(+id);
    }
  }

  loadCharacter(id: number): void {
    this.isLoading = true;
    this.rickMortyService.getCharacter(id).subscribe({
      next: (character) => {
        this.character = character;
        this.setupTreeData(character);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading character:', error);
        this.isLoading = false;
      }
    });
  }

  setupTreeData(character: Character): void {
    const treeData: InfoNode[] = [
      {
        name: 'Basic Information',
        children: [
          { name: `Status: ${character.status}` },
          { name: `Species: ${character.species}` },
          { name: `Gender: ${character.gender}` },
          { name: `Type: ${character.type || 'Unknown'}` }
        ]
      },
      {
        name: 'Location Information',
        children: [
          { name: `Origin: ${character.origin.name}` },
          { name: `Current Location: ${character.location.name}` }
        ]
      },
      {
        name: 'Additional Stats',
        children: [
          { name: `Power Level: ${character.powerLevel}` },
          { name: `Experience Points: ${character.experiencePoints}` },
          { name: `Episodes: ${character.episode.length}` }
        ]
      }
    ];
    this.dataSource.data = treeData;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
    this.detailsState = this.showDetails ? 'visible' : 'hidden';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
