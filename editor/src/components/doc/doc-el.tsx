import { useObservable } from '@ngneat/react-rxjs'
import React, { memo, useEffect } from 'react'

interface DocElProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export const DocEl = ({}: DocElProps) => {
  return <div>This is a doc</div>
}
