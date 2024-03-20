import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export default class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, data: {}}

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({data: modifiedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGraphs = () => {
    const {apiStatus, data} = this.state
    const {last7DaysVaccination, vaccinationByAge, vaccinationByGender} = data
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div data-testid="loader" className="center">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
            <h1>Something went wrong</h1>
          </div>
        )
      case apiStatusConstants.success:
        return (
          <>
            <VaccinationCoverage data={last7DaysVaccination} />
            <VaccinationByGender data={vaccinationByGender} />
            <VaccinationByAge data={vaccinationByAge} />
          </>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="body">
        <div>
          <div className="logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <p>Co-WIN</p>
          </div>
          <h1>CoWIN Vaccination In India</h1>
          {this.renderGraphs()}
        </div>
      </div>
    )
  }
}
