import _ from 'lodash'
import { FC } from 'react'
import Alert from '../@types/Alert'
import State from '../@types/State'
import Thunk from '../@types/Thunk'
import { AlertType } from '../constants'
import alertStore from '../stores/alert'

interface Options {
  alertType?: keyof typeof AlertType
  showCloseLink?: boolean
  value: string | null
  isInline?: boolean
  // used to cancel imports
  importFileId?: string
}

let clearAlertTimeoutId: ReturnType<typeof setTimeout> | null = null

/** Set an alert with an optional close link. */
const alertReducer = (state: State, { alertType, showCloseLink, value, isInline = false, importFileId }: Options) => {
  if (value === state.alert?.value) return state
  return {
    ...state,
    alert: value
      ? {
          alertType,
          showCloseLink: showCloseLink !== false,
          value,
          importFileId,
          isInline,
        }
      : null,
  }
}

/**
 * Dispatches an alert action.
 *
 * @param value The string or React Component that will be rendered in the alert.
 * @param showCloseLink Show a small 'x' in the upper right corner that allows the user to close the alert. Default: true.
 * @param type An arbitrary alert type that can be added to the alert. This is useful if specific alerts needs to be detected later on, for example, to determine if the alert should be closed, or if it has been superceded by a different alert type.
 * @param clearDelay Timeout after which alert will be cleared.
 */
export const alertActionCreator =
  (
    value: string | FC | null,
    {
      alertType,
      showCloseLink,
      clearDelay,
      isInline,
      importFileId,
    }: Omit<Alert, 'value'> & {
      clearDelay?: number
    } = {},
  ): Thunk =>
  (dispatch, getState) => {
    const { alert } = getState()

    /** Clears the original alert, or noop if the alert has changed. */
    const clearOriginalAlert = () => {
      dispatch((dispatch, getState) => {
        const state = getState()
        // Do not clear a different alert than was originally shown.
        // For example, the command palette would be incorrectly cleared after a delay.
        if (alertType !== state.alert?.alertType) return

        // clear alert store value
        if (!value) {
          alertStore.update(null)
        }

        dispatch({
          type: 'alert',
          alertType,
          showCloseLink,
          value: null,
          isInline,
        })
      })
      clearAlertTimeoutId = null
    }

    // if clearDelay is not provided i.e undefined alert should not dismiss.
    if (clearDelay) {
      // if clearAlertTimeoutId !== null, it means that previous alert hasn't been cleared yet. In this case cancel previous timeout and start new.
      clearAlertTimeoutId && clearTimeout(clearAlertTimeoutId)
      clearAlertTimeoutId = setTimeout(clearOriginalAlert, clearDelay)
    }

    // do not show the same alert twice
    // do not clear an alert with a non-matching alertType
    if (value === (alert?.value || null) || (!value && alert && alertType && alertType !== alert.alertType)) return

    // clear alert store value
    if (!value) {
      alertStore.update(null)
    }

    dispatch({
      type: 'alert',
      alertType,
      showCloseLink,
      value,
      importFileId,
      isInline,
    })
  }

export default _.curryRight(alertReducer)
