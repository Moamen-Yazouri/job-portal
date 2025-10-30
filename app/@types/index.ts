import type { LucideIcon } from "lucide-react";




export interface IJobFromAPI {
  
  id: string;                 
  title: string;              
  company: string;            
  location: string;           
  type: string;              
  salary: string;             
  description: string;        
  isFeatured: boolean;        
  categoryId: number;         

  
  tags?: string[];            
  requirements?: string[];    
  companyUrl?: string;        
  createdAt?: string;         

  companyName?: string;       
  companyWebsite?: string;   
  jobTitle?: string;         
  jobCategory?: string;      
  jobType?: string;          
  jobLocation?: string;      
  experience?: string;       
  salaryRange?: string;      
  featured?: string;         
  jobDescription?: string;   

  email?: string;
  fullName?: string;
  password?: string;

}

export type TJobForDisplay = Pick<
  IJobFromAPI,
  | 'id'
  |'title'
  |'company'
  |'location'
  |'type'
  |'salary'
  |'description'
  |'requirements'
  | 'createdAt'
  | 'companyWebsite'
  | 'jobCategory'
  | 'featured'
  | 'experience'
>;

export interface ICategoryFromAPI {
  id: number | string;
  name: string;
  createdAt?: string; 
}


export interface ICardItem {

  Icon: LucideIcon;

  title: string;
}


export interface IJobForSend {
  title: string;          
  company: string;        
  location: string;       
  type: string;           
  salary: string;         
  description: string;    
  isFeatured: boolean;    
  categoryId: number;     
  companyUrl?: string;    
  experience?: string;    
}

export enum JobCategory {
  FrontendDevelopment = "Frontend Development",
  BackendDevelopment = "Backend Development",
  FullStackEngineering = "Full Stack Engineering",
  DevOpsCloud = "DevOps / Cloud",
  UIUXDesign = "UI/UX Design",
  DataScienceAI = "Data Science / AI",
  MobileDevelopment = "Mobile Development",
  QualityAssuranceQA = "Quality Assurance (QA)",
}

export type TCats = `${JobCategory}`

export enum JobType {
  FullTime = "Full Time",
  PartTime = "Part Time",
  Remote = "Remote",
}

export type TJob = `${JobType}`;