import React, { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IconoAbajo } from "../../../../Iconos/Iconos-NavBar";

export default function SearchVendedor({
  vendedores,
  setSelectedVendedor,
  selectedVendedorId,
}) {
  const [query, setQuery] = useState("");
  const [selectedVendedor, setSelectedVendedorLocal] = useState(null);

  const handleSelectVendedor = (vendedor) => {
    setSelectedVendedorLocal(vendedor);
    setSelectedVendedor(vendedor);
  };

  const filteredVendedores =
    query === ""
      ? vendedores
      : vendedores.filter((vendedor) =>
          vendedor.colaborador_usuario
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox>
      <div className=" ">
        <div className="relative w-[28.5rem] cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none  focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className=" w-full border-none py-1  bg-slate-100 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
            displayValue={(vendedor) => vendedor.colaborador_usuario}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Elegir Vendedor"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconoAbajo className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery("")}>
  {filteredVendedores.length > 0 ? (
    <Combobox.Options className="mt-1 max-h-60 w-full ScrollTableVertical overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
      {filteredVendedores.map((vendedor) => (
        <Combobox.Option
          key={vendedor.id}
          className={({ active }) =>
            `relative cursor-default select-none py-2 pl-10 pr-4 ${
              active ? "bg-gray-300 text-white" : "text-gray-900"
            } ${
              selectedVendedor && selectedVendedor.id === vendedor.id
                ? "bg-gray-300"
                : ""
            }`
          }
          value={vendedor}
          onClick={() => handleSelectVendedor(vendedor)}
        >
          {({ selected, active }) => (
            <>
              <span
                className={`block truncate ${
                  selected ? "font-medium" : "font-normal"
                }`}
              >
                {vendedor.colaborador_usuario}
              </span>
            </>
          )}
        </Combobox.Option>
      ))}
    </Combobox.Options>
  ) : (
    <div className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
      <p className="px-4 py-2 text-gray-500">Sin Resultado</p>
    </div>
  )}
</Transition>
      </div>
    </Combobox>
  );
}


