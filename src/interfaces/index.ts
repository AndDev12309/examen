interface GenericResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
export interface Role extends GenericResponse {
  name: string;
  documentId: string;
  description: string;
  type: string;
}
export interface User extends GenericResponse {
  username: string;
  documentId: string;
  email: string;
  role: Role;
}

export interface BadRequest {
  message: string;
  status: number;
  name: string;
  details: {};
}

export interface Appointment extends GenericResponse {
  code: string;
  documentId: string;
  description: string;
  user: User;
  specialty: Specialty;
}

export interface Specialty extends GenericResponse {
  code: string;
  documentId: string;
  name: string;
  description: string;
  appointment: Appointment;
  user: User;
}

export interface Patient extends GenericResponse {
  name: string;
  documentId: string;
  lastname: string;
  identity: string;
  birthdate: string;
  gender: string;
  city: string;
  address: string;
  phone: string;
  user: User;
}
