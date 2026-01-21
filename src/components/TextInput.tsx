import React, { type ChangeEventHandler, type Ref } from 'react'

const TextInput = ({
    name,
    labelText,
    value,
    type,
    error,
    onChange,
    ref=undefined
}:{
    name: string,
    labelText: string,
    value: string | number,
    type: string,
    error: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    ref: Ref<HTMLInputElement> | undefined,
}) => {
  return (
    
          <div className="my-5">
            <label
              htmlFor={name}
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              {labelText ? labelText : name.charAt(0).toUpperCase()+name.slice(1)}
            </label>
            <input
              ref={ref}
              type={type}
              id={name}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body rounded"
              value={value}
              onChange={onChange}
            // required
            />
            <span className='text-red-600 text-xs'>{error}</span>
          </div>
  )
}

export default TextInput
