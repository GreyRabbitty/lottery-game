import Asterisk from 'assets/images/Asterisk'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useController } from 'react-hook-form'
import Select from 'react-select'
import styled from 'styled-components'

function SelectField({ name, control, rules, defaultValue, subLabel, label, children, hasAsterisk, ...props }) {
  const {
    field: { ref, ...controlProps },
    fieldState: { invalid, isTouched, isDirty, error }
  } = useController({
    name,
    control,
    rules: rules || { required: 'Vui lòng nhập trường này' },
    defaultValue
  })

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#ddd' : !invalid ? '#ddd' : 'red',
      // overwrites hover style
      '&:hover': {
        borderColor: state.isFocused ? '#ddd' : !invalid ? '#ddd' : 'red'
      }
    })
  }

  return (
    <Styles>
      <Form.Group className='mb-3'>
        {(label || children) && (
          <>
            <Form.Label>{label || children}</Form.Label>
            <span>{hasAsterisk && <Asterisk />}</span>
          </>
        )}

        <div>{!!subLabel && <Form.Text>{subLabel}</Form.Text>}</div>
        <Select
          styles={customStyles}
          options={props?.options || []}
          control={control}
          ref={ref}
          isInvalid={invalid}
          {...controlProps}
          onChange={(e) => controlProps?.onChange(e)}
          {...props}
        />
        {error && (
          <Form.Text style={{ color: 'red' }}>{error?.message}</Form.Text>
        )}
      </Form.Group>
    </Styles>
  );
}

export default SelectField

const Styles = styled.div``
