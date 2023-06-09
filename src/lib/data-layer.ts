import DataLayerGeneric from "./DataLayerGeneric";
import Persona from "../types/persona";
import settings from "./settings";

const personasURL = settings.api["URL"]+"/personas"; // URL cargada en Settings
const GenericDataLayer = DataLayerGeneric<Persona>(personasURL);

// Crear wrappers para las funciones en GenericDataLayer
const fnCreatePersona = async (persona: Persona) => {
  return await GenericDataLayer.create(persona);
}

const fnDeletePersona = async (id: string) => {
  await GenericDataLayer.delete(id);
}

const fnFetchPersona = async (id: string) => {
  return await GenericDataLayer.fetch(id);
}

const fnFetchPersonas = async () => {
  return await GenericDataLayer.fetchAll();
}

const fnUpdatePersona = async (id: string, persona: Persona) => {
  return await GenericDataLayer.update(id, persona);
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
