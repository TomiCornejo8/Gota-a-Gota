import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.sass']
})
export class AvisoComponent implements OnInit {

  clave:string;
  checkFlag:boolean = false;
  @Output() verificar = new EventEmitter<boolean>();
  @Input() edit:boolean;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  checkText(){
    if(this.clave == ''){
      this.checkFlag = false;
    }else{
      this.checkFlag = true;
    }
  }

  cancel(){
    this.clave = '';
    this.checkFlag = false;
  }

  submit(){
    let user = JSON.parse(sessionStorage.getItem('sitiomovil') || "[]");
    this.usuarioService.get(user.usuario,this.clave).subscribe(data=>{
      if(data){
        if(this.edit){
          this.cancel();
          this.verificar.emit(true);
        }
      }else{
        alert("Contrseña incorrecta: Permiso denegado");
        this.verificar.emit(false);
        this.cancel();
        sessionStorage.clear();
        window.location.href="/inicio-screen";
      }
    });
  }
}
