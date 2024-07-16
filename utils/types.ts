import * as z from "zod";
import validator from "validator";

export enum BusinessActivityFamilyEnum {
  Conseil = "Conseil/Service aux Entreprises/Education/Formation",
  Bien = "Bien-Être",
  Informatique = "Informatique et Technologie",
  Marketing = "Média/Marketing",
  Service = "Service à la personne",
  Activites = "Activités Spécifiques",
}

export const userInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  birthDate: z.date(),
  email: z.string().email({ message: "Invalid email address" }),
  businessActivityFamily: z.nativeEnum(BusinessActivityFamilyEnum),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  insuranceDate: z.date(),
  agreeWithPolicy: z.boolean(),
});

export type UserInfoType = z.infer<typeof userInfoSchema>;

export type GetUserType = {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  businessActivityFamily: string;
  phoneNumber: string;
  insuranceDate: Date;
  productPrice: string;
};
