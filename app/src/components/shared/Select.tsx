// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactNode } from 'react';

interface Option {
  id: number;
  nome: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
}

export function Select({ label, value, onChange, options, placeholder }: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
}