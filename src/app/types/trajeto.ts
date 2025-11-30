export type Trajeto = {
  idTrajeto: number;
  comandosEnviados: string;
  comandosExecutados: string | null;
  status: boolean | null;
  tempo: number | null;
};
