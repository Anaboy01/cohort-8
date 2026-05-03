import { useState } from 'react'

/**
 * useConfirm
 * ----------
 * Manages the state for a confirmation dialog (e.g., before deleting a product).
 *
 * Returns:
 *   pendingId    – the ID of the item currently awaiting confirmation, or null
 *   requestConfirm(id) – opens the dialog for the given id
 *   cancelConfirm()    – closes the dialog without taking action
 *   isOpen       – boolean, true when the dialog should be visible
 */
const useConfirm = () => {
  const [pendingId, setPendingId] = useState(null)

  const requestConfirm = (id) => setPendingId(id)
  const cancelConfirm = () => setPendingId(null)

  return {
    pendingId,
    isOpen: pendingId !== null,
    requestConfirm,
    cancelConfirm,
  }
}

export default useConfirm
