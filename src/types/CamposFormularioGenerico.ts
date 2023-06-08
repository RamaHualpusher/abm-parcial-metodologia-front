export interface FormField {
  key: string;
  label: string;
  type: string;
  options?: { label: string; value: string }[]; // Para los select
  required?: boolean;
}

export interface GenericFormProps<T> {
  initialData: T;
  fields: FormField[];
  handleSubmit: (data: T) => void;
}
