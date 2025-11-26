export type Trajeto = {
  idTrajeto: number;
  comandosEnviados: string;
  comandosExecutados: string | null;
  status: string | null;
  tempo: string | null;
};
