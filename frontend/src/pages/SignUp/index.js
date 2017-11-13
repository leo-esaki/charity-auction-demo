import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'

import AppContainerLayout from 'components/AppContainerLayout'
import AppLayout1 from 'pages/AppLayout1'
import fbHandle from 'utils/fbHandle'
import SignUpForm from 'components/SignUpForm'
import { signUp } from 'store/modules/auth'

class SignUp extends PureComponent {

  static propTypes = {
    fbReady: PropTypes.bool,
    signUp: PropTypes.func.isRequired,
    signUpWithFacebook: PropTypes.func.isRequired
  }

  state = {
    signUpStatus: 0,
  }

  handleSubmit = (data) => {
    this.setState({
      signUpStatus: 1
    })

    this.props.signUp({
      data,
      success: () => this.setState({
        signUpStatus: 10
      }),
      fail: () => this.setState({
        signUpStatus: -1
      }),
    })
  }

  handleSignUpWithFacebook = (event) => {
    const { fbReady, signUpWithFacebook } = this.props
    event.preventDefault()

    if (!fbReady) {
      return
    }
    
    this.setState({
      signUpStatus: 1
    })

    signUpWithFacebook({
      success: () => this.setState({
        signUpStatus: 10
      }),
      fail: () => this.setState({
        signUpStatus: -1
      })
    })
  }

  render() {
    const { fbReady } = this.props
    const { signUpStatus } = this.state

    return (
      <AppLayout1>
        <AppContainerLayout>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              {
                signUpStatus === 10 ?
                <center>
                  You've successfully signed up a new account. Please check your email for account verification.
                </center>
                :
                <div>
                  <h3 className="mb-4 text-center">Sign Up</h3>

                  {signUpStatus === -1 && <div className="mb-2 text-danger">
                    Failed to sign up
                  </div>}

                  <SignUpForm onSubmit={this.handleSubmit} disabled={signUpStatus === 1} />

                  <div className="text-center mt-2">
                    <a className={fbReady ? '' : 'text-muted'} href="/" onClick={this.handleSignUpWithFacebook}>
                      Sign Up With Facebook
                    </a>
                  </div>

                </div>
              }
            </div>
          </div>
        </AppContainerLayout>
      </AppLayout1>
    )
  }
}

const selector = createStructuredSelector({
})

const actions = {
  signUp
}

export default compose(
  fbHandle,
  connect(selector, actions)
)(SignUp)
