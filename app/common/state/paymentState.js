/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const {makeImmutable} = require('./immutableUtil')

const paymentState = {
  setLocation: (state, location) => {
    state = makeImmutable(state)
    return state.set('publisherLocation', makeImmutable(location))
  },
  setPublisherInfo: (state, action) => {
    state = makeImmutable(state)
    return state.set('publisherInfo', makeImmutable(action))
  },
  setLedgerInfo: (state, action) => {
    state = makeImmutable(state)
    return state.set('ledgerInfo', makeImmutable(action))
  },
  onBackupKeys: (state, action, ledger) => {
    state = makeImmutable(state)
    return ledger.backupKeys(state, action)
  },
  onRecoverKeys: (state, action, ledger) => {
    state = makeImmutable(state)
    return ledger.recoverKeys(state, action)
  }
}

module.exports = paymentState
