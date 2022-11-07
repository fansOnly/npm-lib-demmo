import { withInstall, withNoopInstall } from '@vitamin/shared'
import CheckBox from './src/checkbox.vue'
import CheckBoxGroup from './src/checkbox-group.vue'

export const VcCheckBox = withInstall(CheckBox, {
  CheckBoxGroup
})
export const VcCheckBoxGroup = withNoopInstall(CheckBoxGroup)
export default VcCheckBox
