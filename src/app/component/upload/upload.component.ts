import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/services/upload/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: FormGroup
  response
  modelName
  list
  emptylist = true
  listMes = "No 3D models avaialble to view"
  uploadFileName
  validationMsg
  isValid

  constructor (
    private formBuilder: FormBuilder, 
    private uploadService: UploadService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      uploadinput: ['']
    });
    
    console.log("ngOnInit fired")
    this.retrieveList()

    this.isValid = false
  }

  retrieveList(): void {
    this.listMes = "Loading the list"
    this.uploadService.getAll()
    .subscribe({
      next: (data) => {
      var TDmodelsList = data
        
      // ignoring first initializing_file.txt in list
      if (TDmodelsList.length > 1) { 
        this.emptylist = false
        this.list = TDmodelsList.filter(item => item.split('.')[1] == 'fbx' || item.split('.')[1] == 'glb')
      }
      else { 
        this.emptylist = true
        this.listMes = "No 3D models avaialble to view" 
      }

      console.log("uploadService.getAll observable: " + JSON.stringify(data))
      },
      error: (e) => {
        console.log("uploadService.getAll observable rejected with " + JSON.stringify(e))
        console.error(e)
      }
    });
  }

  onChange(event) {
    if(event.target.files != undefined) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0]
        this.uploadFileName = file['name']

        if (this.uploadFileName.split('.')[1] == 'glb' || this.uploadFileName.split('.')[1] == 'fbx') {
          
          // Just making sure that djagno res api on heroku free server won't crash of 
          // getting out of storage memory by uploaded 3d models, 
          // because I have not developed 3d model delete functionality.
          if (this.list != null) {
            if (this.list.length > 100) {
              this.form = this.formBuilder.group({ uploadinput: [''] });
              this.validationMsg = " Cant upload more than 100 3d models, just making " + 
              "sure Djagno rest api on heroku free server won't crash of getting " + 
              "out of storage memory by uploaded 3d models, because I have not " + 
              "developed 3d model delete functionality."
            }
          }
          else {
            this.isValid = true
            this.form.get('uploadinput').setValue(file)
          }
        }
        else {
          this.form = this.formBuilder.group({ uploadinput: [''] });
          this.validationMsg = "Please upload files with extension .glb or .fbx"
        }
      }
    }
  }

  onSubmit() {
    if (this.isValid) { this.uploadTDModel() }
  }

  uploadTDModel() {
    const formData = new FormData();
    formData.append('file', this.form.get('uploadinput').value)
    var _uploadService = this.uploadService.upload(formData)
    this.uploadService.upload(formData)
    .subscribe({        
      next: (res)=>{
      this.response = res
      var TDmodelName = JSON.stringify(res).split('/')[2].split('"')[0]
      this.modelName = 'Your 3D model "' + TDmodelName + '" uploaded successfully'
      console.log("Upload service resolved with: " + JSON.stringify(res))
      this.form = this.formBuilder.group({
        uploadinput: ['']
      });
      this.retrieveList()
    }, 
    error: (error)=>{
      console.log("Upload service with " + JSON.stringify(error))
      }
    })    
  }

  routeToViewmodel(filename: string): void {
    this.router.navigateByUrl("/viewmodel?filename="+filename);
  }
}
