import React, { createContext, useContext, useState } from 'react';
import Medidas from '../model/Medidas';

interface MedidasContextData {
  medidaAtual: Medidas | null;
  setMedidaAtual: (medida: Medidas | null) => void;
}

const MedidasContext = createContext<MedidasContextData>({} as MedidasContextData);

export function MedidasProvider({ children }: { children: React.ReactNode }) {
  const [medidaAtual, setMedidaAtual] = useState<Medidas | null>(null);

  return (
    <MedidasContext.Provider value={{ medidaAtual, setMedidaAtual }}>
      {children}
    </MedidasContext.Provider>
  );
}

export function useMedidasContext() {
  const context = useContext(MedidasContext);
  if (!context) {
    throw new Error('useMedidasContext must be used within a MedidasProvider');
  }
  return context;
}