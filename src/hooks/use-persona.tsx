import * as React from 'react';

import DataLayer from '../lib/data-layer';
import Persona from '../types/persona';

interface PersonasState {
  loading: boolean;
  error: any;
  persona: Persona;
}

export default function usePersona(id: string) {
  // State
  const [personaState, setPersonaState] = React.useState<PersonasState>({ loading: false, error: null, persona: { email: '', firstName: '', lastName: '' } });

  // Effects
  React.useEffect(() => {
    async function fetchPersona() {
      try {
        if (id) {
          // Show spinner before fetching
          setPersonaState({ loading: true, error: null, persona: { email: '', firstName: '', lastName: '' } });
          // Fetch persona from our bff endpoint
          const persona = await DataLayer.fetch.persona(id);
          setPersonaState({ loading: false, error: null, persona });
        }
      } catch (error: any) {
        setPersonaState({ loading: false, error, persona: { email: '', firstName: '', lastName: '' } });
      }
    }

    fetchPersona();
  }, []);

  return personaState;
}