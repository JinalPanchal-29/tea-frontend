import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authService = inject(AuthService)
  fireStorage = inject(AngularFireStorage)

  userDetails;
  constructor(){}

  ngOnInit(){
    this.userDetails = this.authService.currentUserSignal()
    console.log(this.userDetails)
  }

  async onFileChange(event: any){
    const file = event.target.files[0];
    
    if(file){
      const path = `profile/${file.name}`;
      const upload = await this.fireStorage.upload(path, file)
      const downloadUrl = await upload.ref.getDownloadURL()
    }
  }
}
