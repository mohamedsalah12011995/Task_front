import { Data } from '@angular/router';
import { Department } from './Department';
import { Job } from './job';

export class Employee {

    constructor() {
            this.id=0;
            this.fullName=''
            this.adress=''
            this.mobileNumber=''
            this.email=''
            this.photo=''
            this.age=''
            this.dateOfBirth = new Date();
            this.departmentId = 0;
            this.jobId = 0 ;
            this.department = new Department();
            this.job = new Job();
    }

    id:number;
    fullName:string;
    adress:string;
    mobileNumber:string;
    email:string;
    photo:string;
    age:string;
    dateOfBirth:Data ;
    departmentId : number ;
    jobId : number ;
    department : Department ;
    job : Job ;
}