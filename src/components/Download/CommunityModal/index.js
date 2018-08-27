import React from 'react'
import { translate } from 'react-i18next'
import isEmpty from 'lodash/isEmpty'

import Modal from '../../Modal/index'
import Button from '../../Button/index'
import Checkbox from '../../Checkbox/index'

import { ReactComponent as Community } from '../../../assets/community.svg'
import { ReactComponent as Email } from '../../../assets/email.svg'

import styles from './index.module.scss'

const checkEmailValid = value => !isEmpty(value) && /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)

class CommunityModal extends React.Component {
  state = {
    submitted: false,
    notify: true,
    value: '',
  }

  hanleCheckbox = value => {
    this.setState({
      notify: !value,
    })
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  handleDownload = () => {
    this.setState(
      {
        submitted: true,
      },
      () => {
        const { value, notify } = this.state

        const a = document.createElement('a')
        a.download = 'kubesphere.tgz'
        a.target = "_blank"
        a.href = `https://kubesphere.anybox.qingcloud.com/s/zFccwNOKC0MNu1cA3lkZZIueyr1cqvgF?email=${value}&notify=${notify}`
        a.click()
      }
    )
  }

  renderRightContent() {
    const { t } = this.props
    const { submitted, value } = this.state

    if (submitted) {
      return (
        <div>
          <div className="h2">{t('Thank you for downloading KubeSphere')}</div>
          <p
            style={{ marginBottom: 80, marginTop: 8 }}
            dangerouslySetInnerHTML={{
              __html: t(
                'If you have any questions, see the <a href="//docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/" target="_blank">KubeSphere Installation Guide</a>'
              ),
            }}
          />
          <div className="h4">{}</div>
          <p
            style={{ marginTop: 8 }}
            dangerouslySetInnerHTML={{
              __html: t(
                'If you need to install offline please select the <a href="//kubesphere.anybox.qingcloud.com/s/UBBctImJLtxnkqT5hrEaijjolTENNVsr" target="_blank">offline installation package</a>;'
              ),
            }}
          />
          {/* <p
            dangerouslySetInnerHTML={{
              __html: t(
                'If you already have a Kubernetes cluster, you can select <a href="" target="_blank"> KS-Core installation </a>'
              ),
            }}
          /> */}
        </div>
      )
    }

    const disableButton = !checkEmailValid(value)

    return (
      <div>
        <div className="h2">{t('Download')}</div>
        <p style={{ marginBottom: 20 }}>
          {t('To get the latest KubeSphere news via leaving your contact information')}
        </p>
        <div className={styles.input}>
          <Email />
          <input
            type="email"
            name="email"
            value={value}
            placeholder="User@example.com"
            onChange={this.handleChange}
          />
          <Button
            type="control"
            size="small"
            disabled={disableButton}
            onClick={this.handleDownload}
          >
            {t('Download')} →{' '}
          </Button>
        </div>
        <Checkbox className={styles.checkbox} onChange={this.hanleCheckbox}>
          <span>{t('Do not want to be frequently notified by email')}</span>
        </Checkbox>
      </div>
    )
  }

  render() {
    const { t } = this.props
    return (
      <Modal
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        style={{ content: { width: 960 } }}
        {...this.props}
      >
        <div className={styles.body}>
          <div className={styles.leftContent}>
            <div style={{ marginBottom: 40 }}>
              <Community />
              <div className={styles.text}>
                <div className="h2">{t('Community Edition')}</div>
                <p>{t('Community Edition')}</p>
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: t(
                  'More than 1000 users have already downloaded and used KubeSphere ,  please contact us via <a href="//github.com/kubesphere/kubesphere" target="_blank">Github</a> or <a href="//kubesphere.slack.com" target="_blank">Slack</a> if you have any questions.'
                ),
              }}
            />
          </div>
          <div className={styles.rightContent}>{this.renderRightContent()}</div>
        </div>
      </Modal>
    )
  }
}

export default translate('base')(CommunityModal)
