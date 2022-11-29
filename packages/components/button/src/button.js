
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'error',
  ''
]

export const buttonProps = {
  type: {
    type: String,
    values: buttonTypes,
    default: 'default'
  },
  round: {
    type: Boolean,
    default: false
  }
}

export const buttonEmits = {
  click: evt => evt instanceof MouseEvent
}
