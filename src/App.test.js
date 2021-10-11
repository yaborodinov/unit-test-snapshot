import React from 'react'
import App from './App'
import AccountBalance from './components/AccountBalance'
import Notification from './components/Notification'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

const userBalance = {
  balance: 1100,
  savingBalance: 103
}

describe('rendering components', () => {
  it('renders App component without crashing', () => {
    shallow(<App/>)
  })

  it('renders App component header without crashing', () => {
    const wrapper = shallow(<App />)
    const header = (<h1 className="has-text-centered title is-1">Welcome in the personal
      finance app!</h1>)
    
    expect(wrapper.contains(header)).toEqual(true)
  })

  it('renders Notification component without crashing', () => {
    shallow(<Notification/>)
  });

  it('renders buttons', () => {
    const wrapper = mount(<AccountBalance accounts={ userBalance} />)
    const label = wrapper.find('#balance-button').text()
    expect(label).toEqual('Send 100$')
  });
})

describe('passing props', () => {
  const accountWrapper = mount(<AccountBalance accounts={userBalance} />)
  const notificationWrapper = mount(<Notification balance={userBalance.balance} />)

  it('accepts user account props', () => {
    expect(accountWrapper.props().accounts).toEqual(userBalance)
  })
  it('contains savingBalance value', () => {
    const value = accountWrapper.find('.savings').text()
    const expectedValue = userBalance.savingBalance + '$'
    expect(value).toEqual(expectedValue)
  })
  it('notification accepts props', () => {
    expect(notificationWrapper.props().balance).toEqual(userBalance.balance)
  })
})

describe('logic', () => {
  const wrapper = mount(<AccountBalance accounts={userBalance} />)
  // const notificationWrapper = mount(<Notification balance={userBalance.balance} />)
  wrapper.find('#balance-button').simulate('click')
  it('button click - update savings', () => {
    const savingValue = wrapper.find('.savings').text()
    const expectedValue = userBalance.savingBalance + 100 + '$'
    expect(savingValue).toEqual(expectedValue)
  });
  it('button click - update balance', () => {
    const balanceValue = wrapper.find('.balance').text()
    const expectedBalanceValue = userBalance.balance - 100 + '$'
    expect(balanceValue).toEqual(expectedBalanceValue)
  });
})

describe('snapshots', () => {
  it('App snapshots', () => {
    const tree = shallow(<App />)
    expect(toJson(tree)).toMatchSnapshot()
  });
  it('Accounts snapshot', () => {
    const accountBalanceTree = shallow(<AccountBalance accounts={userBalance} />)
    expect(toJson(accountBalanceTree)).toMatchSnapshot()
  });
  it('Notification snapshot', () => {
    const notificationTree = shallow(<Notification balance={userBalance.balance} />)
    expect(toJson(notificationTree)).toMatchSnapshot()
  });
})
