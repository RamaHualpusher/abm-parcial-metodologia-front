// Crear la función genérica para el manejo de datos
const DataLayerGeneric = <T extends {id?: string}>(urlBase: string) => {

  let initialData: T[] = [];

  const loadInitialData = async () => {
    const response = await fetch(urlBase);
    initialData = await response.json();
  };

  loadInitialData();

  const fnCreate = (obj: T) => {
    obj.id = (Math.random() * 10000).toFixed(0); // Genera un ID aleatorio.
    const newObj = [...initialData, obj];
    initialData = newObj;
    return obj;
  };

  const fnDelete = (id: string) => {
    const filteredObj = initialData.filter((item: T) => item.id !== id);
    initialData = filteredObj;
  };

  const fnFetch = (id: string) => {
    const obj = initialData.find((item: T) => item.id === id);
    return obj || null;
  };

  const fnFetchAll = () => {
    return initialData;
  };

  const fnUpdate = (id: string, obj: Partial<T>) => {
    const editedObj = initialData.map((item: T) => item.id === id ? {...item, ...obj} : item);
    initialData = editedObj;
    return obj;
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