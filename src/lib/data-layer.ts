import Persona from "../types/persona";
import settings from "./settings";

async function fnCreatePersona(persona: Persona) {
  try {
    // Create new persona
    const newPersona = await fetch(
      settings.api.personas,
      {
        body: JSON.stringify(persona),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
    // Return created persona
    return newPersona;
  } catch (error: any) {
    throw error;
  }
};

async function fnDeletePersona(id: string) {
  try {
    // Delete persona by given id
    await fetch(`${settings.api.personas}/${id}`, { method: 'DELETE' });
  } catch (error: any) {
    throw error;
  }
};

async function fnFetchPersona(id: string) {
  try {
    // Fetch given persona
    const response = await fetch(`${settings.api.personas}/${id}`);
    const persona = await response.json();
    // Return persona
    return persona;
  } catch (error: any) {
    throw error;
  }
};

async function fnFetchPersonas() {
  try {
    // Fetch personas
    const response = await fetch(settings.api.personas);
    const personas = await response.json();
    // Return personas
    return personas;
  } catch (error: any) {
    throw error;
  }
};

async function fnUpdatePersona(id: string, persona: Persona) {
  try {
    // Update given persona
    const editedPersona = await fetch(
      `${settings.api.personas}/${id}`,
      {
        body: JSON.stringify(persona),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    );
    // Return edited persona
    return editedPersona;
  } catch (error: any) {
    throw error;
  }
};

const DataLayer = {
  create: {
    persona: fnCreatePersona,
  },
  delete: {
    persona: fnDeletePersona,
  },
  fetch: {
    persona: fnFetchPersona,
    personas: fnFetchPersonas,
  },
  update: {
    persona: fnUpdatePersona,
  },
};

export default DataLayer;
