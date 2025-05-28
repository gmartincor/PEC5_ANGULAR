import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../../models/character';

@Component({
  selector: 'app-grid-base',
  templateUrl: './grid-base.component.html',
  styleUrls: ['./grid-base.component.scss']
})
export class GridBaseComponent implements AfterViewInit {
  @Input() set characters(value: Character[]) {
    this.dataSource.data = value;
  }
  @Output() rowClick = new EventEmitter<number>();
  
  displayedColumns: string[] = ['image', 'name', 'species', 'status', 'origin', 'location'];
  dataSource = new MatTableDataSource<Character>([]);

  ngAfterViewInit() {
    // Permitir tiempo para que la tabla se renderice correctamente
    setTimeout(() => {
      this.dataSource._updateChangeSubscription();
    });
  }

  onRowClick(character: Character): void {
    this.rowClick.emit(character.id);
  }
}
