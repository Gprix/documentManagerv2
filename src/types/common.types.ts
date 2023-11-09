export type NextFont = {
  className: string;
  style: {
    fontFamily: string;
    fontWeight?: number;
    fontStyle?: string;
  };
};

export type DocumentType = "DNI" | "CE";

export type Role = "NOTARIO/A" | "ASISTENTE NOTARIAL";

export interface Member {
  uid: string;
  name: string;
  email: string;
  documentType: DocumentType;
  documentNumber: string;
  role: Role;
  photoURL: string;
}
