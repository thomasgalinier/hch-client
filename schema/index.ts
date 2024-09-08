import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().email({message: "Email invalide"}),
    password: z.string().min(2, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
});

export const SignUpSchema = z.object({
    nom: z.string().min(1,{message: "Le nom est obligatoire"}),
    prenom: z.string().min(1,{message: "Le prénom est obligatoire"}),
    email: z.string().email({message: "Email invalide"}),
    password: z.string().min(2, {message: "Le mot de passe doit contenir au moins 6 caractères"}),
    telephone: z.string().min(10,{message: "Le téléphone est obligatoire"}).max(10,{message: "Le téléphone est obligatoire"}),
});

export interface UserType {
    id: string;
    entreprise_id: string;
    nom: string;
    prenom: string;
    email: string;
    role: string;
}

