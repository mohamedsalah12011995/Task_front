import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef,BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest} from '@angular/common/http';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../Services/employee.service';
import { UplodeFileService } from '../Services/Uplode.service';
import { NotificationService } from '../Sheard/notification.service';
import { DepartmentService } from '../Services/department.service';
import { JobService } from '../Services/job.service';
import { Job } from '../models/job';
import { Department } from '../models/Department';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService , DepartmentService , JobService]
})
export class EmployeeComponent implements OnInit {
  modalRef: BsModalRef;

  private BaseItemrUrl: string = environment.baseUrl + 'api/Upload/';
  selectedFiles: FileList;
  ImageName: string;
  imageSrc: any;
  formData: any;
  fileNames: any;
  isnew: boolean = false;
  changeImg: boolean = false;

  employee:Employee = new Employee();
  employees:Employee[]=[];
  deparmentList : Department [] = [] ;
  jobList : Job [] = [] ;
  constructor(private modalService: BsModalService , private http: HttpClient,private notifyService : NotificationService,
               private employeeService:EmployeeService ,private uplodeService:UplodeFileService,
               private deparmentService:DepartmentService ,private jobService:JobService,
               ) {
                
  }

  ngOnInit(): void {
    this.getDeparments();
    this.getJobs();
    this.getEmployees();
    //this.imageSrc = "./files/img/-available.jpg";
    //this.imageSrc = "https://www.iitk.ac.in/cce/courses/2019/fundamental-and-practical-aspects-of-corrosion/images/na.jpg";
    this.imageSrc = "../../assets/images/available.jpg";

  }

  alertSuccess(){
    this.notifyService.showSuccess("Saved Successfully  !!", "add employee")
  }

  alertEdit(){
    this.notifyService.showInfo("Updated Successfully  !!", "update employee")
  }

  alertWarning(){
    this.notifyService.showWarning("Remove Successfully  !!", "remove employee")
  }

  alertError(message){
    this.notifyService.showError(message, "Complete")
  }

  


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  getDeparments(){
    this.deparmentService.getDepartments().subscribe(data=> {
      this.deparmentList =data ;
    })
  }

  
  getJobs(){
    this.jobService.getJobs().subscribe(data=> {
      this.jobList =data ;
    })
  }


  getEmployees(){
    this.employeeService.getEmployees().subscribe(data=> {
      this.employees=data;
      this.filterEmployeeList = data;
    })   
  }

  addEmployee(){

    if(this.employee.fullName =='' || this.employee.adress =='' ||this.employee.mobileNumber =='' || this.employee.age ==''){
      this.alertError('"Please Complete inputs  !!"');
      return;
    }
    if(this.employee.jobId==0 || this.employee.departmentId==0){
      this.alertError('"Please  Select Job and Department  !!"');
      return;
    }

    // in add or change image
    if (this.changeImg) {
      this.uploadFile(this.fileNames); 
      this.uplodeService.uploadFileEmployee(this.formData).subscribe(data => {
        console.log(data);
        this.employee.photo = environment.baseUrl+'files/img/'+ data ;
        this.employeeService.InsertOrUpdateEmployee(this.employee).subscribe(data=> {

          this.formData = new FormData();
          this.clear();
          this.clearimg();
          this.getEmployees();
          if(data.id==0){this.alertSuccess()}
          else{this.alertEdit()}
        })
      })
    }


    // in not change image
    if (!this.changeImg) {
        this.employeeService.InsertOrUpdateEmployee(this.employee).subscribe(data=> {
          this.formData = new FormData();
          this.clear();
          this.clearimg();
          this.getEmployees();
          if(data.id==0){this.alertSuccess()}
          else{this.alertEdit()}});
    }
    
 
  }

  getEmployee(emp:Employee){
    this.employeeService.getEmployeeById(emp.id).subscribe(data => {
      this.employee =data;
      this.imageSrc=data.photo;
      this.isnew=true;

    })
  }

  removeEmployee(id){
    this.employeeService.removeEmployee(id).subscribe(data=> {
      this.getEmployees();
    })
  }

  clear() {
    this.imageSrc = "../../assets/images/available.jpg";
    this.ImageName = null;
    this.changeImg=false;
    this.isnew=false;
    this.employee = new Employee();
  }

  //Clear
  clearimg() {
    this.imageSrc = "../../assets/images/available.jpg";
    this.ImageName = null;
    this.changeImg=false;

  }

  ////uplode Photo 
  uploadFile(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append(file.name, file);
      this.ImageName = file.name;
    }

    this.formData=formData;

    // let url = this.BaseItemrUrl + "UploadFile_Item";

    // const uploadReq = new HttpRequest('POST', url, formData, {
    //   reportProgress: true,
    // });
    // this.http.request(uploadReq).subscribe(event => { });
    // return './files/img/' + this.ImageName;
  }
  //Read url Img
  detectFiles(Files) {
    this.fileNames = Files;
    this.changeImg=true;
  }
  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }



  deleteEmployeeConfirm() {
    this.modalRef.hide();
    this.removeEmployee(this.empId);
  }

  empId = 0;
  deleteEmployee(template: TemplateRef<any>, emp: Employee) {
    this.empId = emp.id
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
  }

  filterEmployeeList : Employee [] = [];
  serchEmployee(name) {
    if (name == null) {
      this.filterEmployeeList = this.employees;
    }
    else {
      this.filterEmployeeList = this.employees.filter(f => f.fullName.toLowerCase().includes(name.toLowerCase()));
    }
  }
  

}
