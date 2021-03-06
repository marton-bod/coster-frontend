import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import { getMonthList, getCurrentMonth, generateAuthHeaders, getErrorDisplayMessage } from '../common/Utils'
import MonthPicker from '../common/MonthPicker'
import axios from 'axios'
import { 
    XYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    RadialChart, 
    LineMarkSeries,
    VerticalBarSeries,
    Hint
} 
from 'react-vis';

class DashboardPage extends Component {
    
    state = {
        loading: true,
        monthlyStats: 0,
        dailyTotals: [],
        categoryTotals: [],
        monthlyTotals: [],
        selectedMonth: getCurrentMonth(),
        monthList: getMonthList(),
        hoveredDaily: false,
        hoveredCategoryPie: false,
        hoveredMonthly: false,
        hoveredCategoryBar: false,
        errorMsg: ""
    }

    componentDidMount() {
        this.setState({loading: true})
        this.loadCharts(this.state.selectedMonth)
    }

    loadCharts = (month) => {
        axios.get(process.env.REACT_APP_DASHBOARD_SVC_URL + '/dashboard/total?month=' + month, generateAuthHeaders())
        .then(res => {
            this.setState({
                monthlyStats: res.data,
                errorMsg: ""
            })
        })
        .catch(error => {
            this.setState({
                errorMsg: getErrorDisplayMessage(error)
            })
        })

    axios.get(process.env.REACT_APP_DASHBOARD_SVC_URL + '/dashboard/daily?month=' + month, generateAuthHeaders())
        .then(res => {
            this.setState({
                dailyTotals: res.data
            })
        })

    axios.get(process.env.REACT_APP_DASHBOARD_SVC_URL + '/dashboard/category?month=' + month, generateAuthHeaders())
        .then(res => {
            this.setState({
                categoryTotals: res.data
            })
        })
    
    axios.get(process.env.REACT_APP_DASHBOARD_SVC_URL + '/dashboard/monthly', generateAuthHeaders())
        .then(res => {
            this.setState({
                monthlyTotals: res.data,
                loading: false
            })
        })
    }

    updateSelectedMonth = (month) => {
        this.setState({
            selectedMonth: month
        })
        this.loadCharts(month)
    }
    
    render() {
        const header = (
            <div className="dashboard-header-section">
                <PageTitle title="Dashboard" />
                <MonthPicker
                    onChange={(e) => this.updateSelectedMonth(e.target.value)}
                    selectedMonth={this.state.selectedMonth}
                    monthList={this.state.monthList}>
                </MonthPicker>
            </div>
        )

        if (this.state.errorMsg) {
            return (
                <div className="dashboard-page">
                    {header}
                    <div className="card-panel red accent-3">{this.state.errorMsg}</div>
                </div>
            )
        }

        if (this.state.loading) {
            return (
                <div className="dashboard-page">
                    {header}
                    <div className="no-expenses-msg page-title">Loading...</div>
                </div>
            )
        }

        if (this.state.monthlyStats.sum === undefined || this.state.monthlyStats.sum === 0) {
            return (
                <div className="dashboard-page">
                    {header}
                    <div className="no-expenses-msg page-title">You have no expenses yet for this period.</div>
                </div>
            )
        }

        return (
            <div className="dashboard-page">
                {header}
                <div className="summary">
                    <h5>Total: {this.state.monthlyStats.sum}</h5>
                    <h5>Daily Average: {Math.round(this.state.monthlyStats.sum / this.state.monthlyStats.count)}</h5>
                    <h5>Daily Max: {this.state.monthlyStats.max}</h5>
                </div>

                <div className="chartarea">
                    <div className="chart-item">
                        <h5>Daily total expenses ({this.state.selectedMonth})</h5>
                        <XYPlot
                            margin={{left: 50}}
                            animation
                            xDomain={[1, 31]}
                            yDomain={[0, 1.2 * Math.max(...this.state.dailyTotals.map(e => e.y))]}
                            width={600}
                            height={300}>
                                {this.state.hoveredDaily !== false && <Hint value={this.state.hoveredDaily} />}
                                <HorizontalGridLines />
                                <LineMarkSeries
                                    animation
                                    data={this.state.dailyTotals}
                                    style={{stroke: 'violet', strokeWidth: 3}}
                                    onValueMouseOver={v => this.setState({hoveredDaily: v})}
                                    onValueMouseOut={v => this.setState({hoveredDaily: false})}/>
                                <XAxis title="Days of the month"/>
                                <YAxis title="Total spend (HUF)"/>
                        </XYPlot>
                    </div>
                    <div className="chart-item">
                        <h5>Category total expenses ({this.state.selectedMonth})</h5>
                        <RadialChart
                            colorType={'literal'}
                            getLabel={d => d.name}
                            getAngle={d => d.value / this.state.monthlyStats.sum}
                            data={this.state.categoryTotals}
                            animation
                            labelsRadiusMultiplier={1.1}
                            labelsStyle={{fontSize: 16,  fontWeight: 'bold'}}
                            showLabels
                            style={{stroke: '#fff', strokeWidth: 2}}
                            width={400}
                            height={300}
                            onValueMouseOver={v => this.setState({hoveredCategoryPie: v})}
                            onSeriesMouseOut={v => this.setState({hoveredCategoryPie: false})}>
                                {this.state.hoveredCategoryPie !== false && <Hint value={this.state.hoveredCategoryPie} />}
                        </RadialChart>
                    </div>
                    <div className="chart-item">
                        <h5>Monthly total expenses</h5>
                        <XYPlot
                            margin={{left: 50}}
                            animation
                            yDomain={[0, 1.2 * Math.max(...this.state.monthlyTotals.map(e => e.y))]}
                            width={600}
                            height={300}
                            xType="ordinal">
                            {this.state.hoveredMonthly !== false && <Hint value={this.state.hoveredMonthly} />}
                            <HorizontalGridLines />
                            <LineMarkSeries
                                animation
                                data={this.state.monthlyTotals}
                                style={{stroke: 'violet', strokeWidth: 3}}
                                onValueMouseOver={v => this.setState({hoveredMonthly: v})}
                                onSeriesMouseOut={v => this.setState({hoveredMonthly: false})}/>
                            <XAxis title="Months"/>
                            <YAxis title="Total spend (HUF)"/>
                        </XYPlot>
                    </div>
                    <div className="chart-item">
                        <h5>Category total expenses ({this.state.selectedMonth})</h5>
                        <XYPlot
                            margin={{left: 50}}
                            animation
                            yDomain={[0, 1.2 * Math.max(...this.state.categoryTotals.map(e => e.value))]}
                            width={400}
                            height={300}
                            xType="ordinal">
                            {this.state.hoveredCategoryBar !== false && <Hint value={this.state.hoveredCategoryBar} />}
                            <HorizontalGridLines />
                            <VerticalBarSeries
                                data={this.state.categoryTotals.map(e => {return {x: e.name, y: e.value}})}
                                onValueMouseOver={v => this.setState({hoveredCategoryBar: v})}
                                onSeriesMouseOut={v => this.setState({hoveredCategoryBar: false})}/>
                            <XAxis />
                            <YAxis title="Total spend (HUF)"/>
                        </XYPlot>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardPage