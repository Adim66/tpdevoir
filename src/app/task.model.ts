import { Project } from "./project.model";

export interface Task {
  id: number;
  name: string;
  description: string;
  price: number;          // Nouveau champ pour le prix
  imageUrl: string;       // Nouveau champ pour l'URL de l'image
  project?: Project | null;
}
