import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {

  http = inject(HttpClient)
  authService = inject(AuthService)
  fb = inject(FormBuilder)
  fireStorage = inject(AngularFireStorage)

  lettersLimit: number = 100;
  allPosts: Array<any>;
  showText: Array<boolean>;
  postForm: FormGroup;
  downloadUrl: string = '';
  showPostLoader: boolean = false;
  userDetails

  constructor() {
    this.postForm = this.fb.group({
      postCaption: '',
      postImage: ''
    })
  }

  ngOnInit() {
    this.getAllPosts();
    this.userDetails = this.authService.currentUserSignal()
    console.log(this.userDetails)
  }

  getAllPosts() {
    let url = "http://localhost:3000/post/getAllPosts"
    this.http.get<any>(url).subscribe(res => {
      this.allPosts = res.allPosts;
      this.showText = new Array(this.allPosts.length).fill(false);
    })
  }

  sharePost() {
    this.postForm.get('postImage').setValue(this.downloadUrl);
    let url = "http://localhost:3000/post/createPost"
    const payLoad = {
      "createdBy": {
        "profileImage": "https://picsum.photos/50",
        "userName": this.userDetails.userName
      },
      "postCaption": this.postForm.getRawValue().postCaption,
      "postImage": this.postForm.getRawValue().postImage,
      "likedBy": [],
      "comments": []
    }

    this.http.post(url, payLoad).subscribe((res) => {
      this.postForm.reset();
      this.downloadUrl = ""
      this.showPostLoader = false;
      this.getAllPosts();
    })
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const path = `profile/${file.name}`;
      this.showPostLoader = true;
      const upload = await this.fireStorage.upload(path, file)
      this.downloadUrl = await upload.ref.getDownloadURL()
    }
  }

}
