import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  flag:boolean = false;
  icono:string = "";

  ngOnInit(): void {
    let datos = sessionStorage.getItem('sitiomovil');
    if(datos){
      let user = JSON.parse(datos || "[]");
      this.icono = user.icono;
      this.flag = true;
    }else{
      this.icono = "";
      this.flag = false;
    }
  }
  cerrarSesion(){
    sessionStorage.clear();
  }
}