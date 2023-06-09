// Crear la función genérica para el manejo de datos
const DataLayerGeneric = <T>(urlBase: string) => {

  const fnCreate = async (obj: T) => {
    const newObj = await fetch(
      urlBase,
      {
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }
    );
    return newObj;
  };

  const fnDelete = async (id: string) => {
    await fetch(`${urlBase}/${id}`, { method: 'DELETE' });
  };

  const fnFetch = async (id: string) => {
    const response = await fetch(`${urlBase}/${id}`);
    const obj = await response.json();
    return obj;
  };

  const fnFetchAll = async () => {
    const response = await fetch(urlBase);
    const objs = await response.json();
    return objs;
  };

  const fnUpdate = async (id: string, obj: T) => {
    const editedObj = await fetch(
      `${urlBase}/${id}`,
      {
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
      }
    );
    return editedObj;
  };

  return {
    create: fnCreate,
    delete: fnDelete,
    fetch: fnFetch,
    fetchAll: fnFetchAll,
    update: fnUpdate,
  };
};

export default DataLayerGeneric;
