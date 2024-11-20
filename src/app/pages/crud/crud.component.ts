import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { response } from 'express';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit{

  displayedColumns:string[] = ['id', 'name', 'email', 'role', 'benefits', 'action'];
  dataSource:any;
  listusers:User[] = [];
  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService){
    this.dataSource = new MatTableDataSource<any>(this.listusers)
  }

  ngOnInit(){
    this.getListUser()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUser(){
    this.usersService.getAllUsers().subscribe({
      next:(response: any) =>{
        console.log('Lista usuários firebase', response)
        this.listusers = response;

        this.dataSource = new MatTableDataSource<any>(this.listusers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
        
      },
      error:(err) => {
        console.error(err);
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}