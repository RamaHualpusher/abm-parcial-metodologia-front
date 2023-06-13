import DataLayerGeneric from "./DataLayerGeneric";
import Persona from "../types/persona";
import settings from "./settings";

const personasURL = settings.api["URL"]+"personas.json"; // URL cargada en Settings
const GenericDataLayer = DataLayerGeneric<Persona>(personasURL);

// Crear wrappers para las funciones en GenericDataLayer
const fnCreatePersona = (persona: Persona) => {
  return GenericDataLayer.create(persona);
}

const fnDeletePersona = (id: string | undefined) => {
  if (id) {
    GenericDataLayer.delete(id);
  }
}


const fnFetchPersona = (id: string) => {
  return GenericDataLayer.fetch(id);
}

const fnFetchPersonas = () => {
  return GenericDataLayer.fetchAll();
}

const fnUpdatePersona = (id: string, persona: Partial<Persona>) => {
  return GenericDataLayer.update(id, persona);
}

// Crear el DataLayer con los nombres de las funciones originales
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