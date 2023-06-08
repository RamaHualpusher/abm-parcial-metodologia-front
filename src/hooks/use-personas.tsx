import * as React from 'react';

import DataLayer from '../lib/data-layer';
import Persona from '../types/persona';

interface PersonasState {
  loading: boolean;
  error: any;
  personas: Persona[];
}

export default function usePersonas() {
  // State
  const [personasState, setPersonasState] = React.useState<PersonasState>({ loading: false, error: null, personas: [] });

  // Define fetchPersonas outside of the useEffect so it can be returned by the hook
  const fetchPersonas = React.useCallback(async () => {
    try {
      // Show spinner before fetching
      setPersonasState({ loading: true, error: null, personas: [] });
      // Fetch personas from our bff endpoint
      const personas = await DataLayer.fetch.personas();
      setPersonasState({ loading: false, error: null, personas });
    } catch (error: any) {
      setPersonasState({ loading: false, error, personas: [] });
    }
  }, []);

  // Effects
  React.useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  return { ...personasState, refetch: fetchPersonas };
}
