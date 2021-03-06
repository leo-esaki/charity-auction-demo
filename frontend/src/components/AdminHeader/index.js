import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
import {
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap'

import AdminHeaderNotificationItem from 'components/AdminHeaderNotificationItem'


class AdminHeader extends PureComponent {

  static propTypes = {
    username: PropTypes.string.isRequired,
    userAvatarImage: PropTypes.string.isRequired,
    notificationListOnMenu: ImmutablePropTypes.list.isRequired,
    notificationListOnMenuLoaded: PropTypes.bool.isRequired,
    notificationUnreadCount: PropTypes.number,
    onSignOut: PropTypes.func.isRequired,
    resetNotificationUnreadCount: PropTypes.func,
  }

  handleSignOut = (e) => {
    e.preventDefault()

    const { onSignOut } = this.props
    if (onSignOut) {
      onSignOut()
    }
  }

  render() {
    const {
      username, userAvatarImage,
      notificationListOnMenu, notificationListOnMenuLoaded, notificationUnreadCount,
      resetNotificationUnreadCount,
    } = this.props

    return (
      <div className="admin-header shadow bg-white">
        <div className="d-flex">
          <div className="pl-4 pr-3">
            <img className="logo" src="/logo.svg" alt="Logo" />
          </div>

          <div className="ml-auto px-4 content text-right text-black">
            <UncontrolledDropdown
              className="mr-3"
              style={{ display: 'inline-block' }}
              onClick={resetNotificationUnreadCount}
            >
              <DropdownToggle
                tag="a"
                className="p-1 position-relative"
                style={{ cursor: 'pointer', fontSize: 22, verticalAlign: 'middle' }}
              >
                <i className="fa fa-bell" />
                {!!notificationUnreadCount && <div className="notification-count bg-primary" />}
              </DropdownToggle>
              {
                notificationListOnMenuLoaded ?
                <DropdownMenu right style={{ left: 'auto' }}>
                  {notificationListOnMenu.map(notification => (
                    <AdminHeaderNotificationItem
                      key={notification.get('pk')}
                      notification={notification}
                    />
                  ))}
                </DropdownMenu>
                :
                <DropdownMenu right style={{ left: 'auto' }}>
                  <div className="py-5 text-center">
                    Loading...
                  </div>
                </DropdownMenu>
              }
            </UncontrolledDropdown>

            <UncontrolledDropdown style={{ display: 'inline-block' }}>
              <DropdownToggle
                tag="a"
                className="text-uppercase"
                style={{ display: 'inline-block', cursor: 'pointer' }}
              >
                <img className="user-avatar mr-3" src={userAvatarImage} alt="User Avatar" />
                <strong>{username}</strong>
                <i className="ml-2 fa fa-caret-down" />
              </DropdownToggle>
              <DropdownMenu right style={{ width: 200 }}>
                <DropdownItem tag={Link} to="/">View Site</DropdownItem>
                <DropdownItem tag={Link} to="/account">Account Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleSignOut}>Sign Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminHeader
