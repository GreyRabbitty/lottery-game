import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import classNames from 'classnames'
import Asterisk from 'assets/images/Asterisk'

function RadioField(props) {
  const generateCheck = props?.options?.map((option, index) => {
    const isChecked = option?.value === props?.checkValue

    return (
      <React.Fragment
      key={`${option?.label}_${index}`}
      >
        <Form.Check
          className="mb-2"
          id={`${option?.label}_${index}`}
          name={props?.name}
          type={option?.type || 'radio'}
          onChange={e => props.onChange(e.target.value)}
          label={option?.label}
          value={option?.value}
          checked={isChecked}
        />
        <div className='my-3'>
          {isChecked && option?.component}
        </div>
      </React.Fragment>
    )
  })

  return (
    <Styles>
      <Form.Label className={classNames(props?.labelClasses)}>{props?.label}</Form.Label>
      <div>{props?.subLabel}</div>
      <Form.Group>{generateCheck}</Form.Group>
    </Styles>
  )
}

export default RadioField

const Styles = styled.div`
  margin-bottom: 1rem;
`
