import { withInstall, withNoopInstall } from '@vitamin/shared'
import Cell from './src/cell.vue'
import CellGroup from './src/cell-group.vue'

export const VxCell = withInstall(Cell, {
  CellGroup
})
export const VxCellGroup = withNoopInstall(CellGroup)
export default VxCell
