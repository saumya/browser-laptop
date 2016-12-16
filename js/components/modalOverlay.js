/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const ImmutableComponent = require('./immutableComponent')
const KeyCodes = require('../../app/common/constants/keyCodes')

/**
 * Represents a modal overlay
 */

var globalInstanceCounter = 0
var mountedInstances = []

class ModalOverlay extends ImmutableComponent {
  constructor () {
    super()
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentWillMount () {
    this.instanceId = globalInstanceCounter++

    this.setState({last: true})

    if (mountedInstances.length) {
      let lastModal = mountedInstances[mountedInstances.length - 1]
      lastModal.setState({last: false})
      lastModal.forceUpdate()
    }

    mountedInstances.push(this)
  }

  componentWillUnmount () {
    let instId = this.instanceId

    mountedInstances = mountedInstances.filter(function (inst) {
      return inst.instanceId !== instId
    })

    if (mountedInstances.length) {
      let lastModal = mountedInstances[mountedInstances.length - 1]
      lastModal.setState({last: true})
      lastModal.forceUpdate()
    }
  }

  onKeyDown (e) {
    switch (e.keyCode) {
      case KeyCodes.ESC:
        this.props.onEscape()
        break
    }
  }

  get dialogContent () {
    var close = null
    var button = null
    var title = null
    if (!this.props.emptyDialog) {
      close = (this.props.onHide ? <button type='button' className='close' onClick={this.props.onHide} /> : null)
      title = (this.props.title ? <div className='sectionTitle' data-l10n-id={this.props.title} /> : null)
    }
    let customTitleClassesStr = (this.props.customTitleClasses ? this.props.customTitleClasses : '')

    return <div className={'dialog ' + customTitleClassesStr}>
      <div className='dialog-header'>
        {close}
        {title}
      </div>
      <div className='dialog-body'>
        {this.props.content}
      </div>
      <div className='dialog-footer'>
        {this.props.footer}
      </div>
    </div>
  }

  render () {
    return <div onKeyDown={this.onKeyDown} className={'modal fade' + (this.state.last ? ' last' : '') + (this.props.transparentBackground ? ' transparentBackground' : '')} role='alert'>
      {this.dialogContent}
    </div>
  }
}

module.exports = ModalOverlay
