import { withInstall, withNoopInstall } from '@vitamin/shared'
import Cell from './src/cell.vue'
import CellGroup from './src/cell-group.vue'

export const VcCell = withInstall(Cell, {
  CellGroup
})
export const VcCellGroup = withNoopInstall(CellGroup)
export default VcCell
