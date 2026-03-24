export interface Usuario {
    id_usuario: number;
    nombre: string;
    email: string;
    password_hash: string;
    creado_en: Date;
}