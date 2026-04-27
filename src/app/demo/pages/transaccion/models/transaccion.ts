export interface Transaccion {
    monto: number;
    descripcion: string;
    tipo: 'ingreso' | 'gasto';
    id_categoria: number;
}