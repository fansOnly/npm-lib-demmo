import { withInstall, withNoopInstall } from '@vitamin/shared'
import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'

export const VcCheckbox = withInstall(Checkbox, {
  CheckboxGroup
})
export const VcCheckboxGroup = withNoopInstall(CheckboxGroup)
export default VcCheckbox
