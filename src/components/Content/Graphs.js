import React from 'react';
import {Line as LineChart} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {textPage} from './texts';
import * as _ from 'lodash';
import {fetchOthers, fetchOther} from "../../store/values";
import {fetchPrice, fetchCourses} from "../../store/courses";

const whiteColor = '#FFF';

const commonData = {
    datasets: [
        {
            fill: false,
            lineTension: 0.5,
            borderColor: whiteColor,
            borderDashOffset: 0.0,
            pointBackgroundColor: whiteColor,
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            spanGaps: true,
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                return +tooltipItem.yLabel.toFixed(3);
            },
        },
    },
    scales: {
        yAxes: [
            {
                gridLines: {
                    zeroLineColor: '#fff',
                    color: '#fff',
                    beginAtZero: true,
                },
                ticks: {
                    fontColor: '#fff',
                    callback: function (value, index, values) {
                        return +value.toFixed(4);
                    },
                    maxTicksLimit: 5,
                },
            },
        ],
        xAxes: [
            {
                gridLines: {
                    display: false,
                    color: '#fff',
                },
                ticks: {
                    fontColor: '#ffffff',
                    callback: function (value, index, values) {
                        return "";
                    },
                },
            },
        ],
    },
};

const tokenOptions = _.cloneDeep(options);
tokenOptions.scales.xAxes[0].scaleLabel = {
    display: true,
    fontColor: '#ccc',
    fontStyle: "bold",
};
tokenOptions.scales.yAxes[0].scaleLabel = {
    display: true,
    fontColor: '#ccc',
    fontStyle: "bold",
};

const costOptions = _.cloneDeep(options);
costOptions.scales.xAxes[0].scaleLabel = {
    display: true,
    fontStyle: "bold",
};
costOptions.scales.yAxes[0].scaleLabel = {
    display: true,
    // labelString: 'Token price in ETH',
    fontStyle: "bold",
};

class Graphs extends React.Component {
    componentWillMount() {
        if (!window.web3) {
            this.props.fetchOthers()
            this.props.fetchPrice()
        }
        if(window.web3){
            window.web3.eth.getAccounts((err, accs) => {
                if(!accs[0]) {
                    this.props.fetchOther()
                    this.props.fetchCourses()
                }
            });
        }
    }

    getTokenData() {
        const data = _.cloneDeep(commonData);
        data.labels = [];
        data.datasets[0].data = [];

        const p = this.props.price;

        for (let i = 0; i < 10; i++) {
            data.datasets[0].data.push(Math.round(this.props.totalSupply + 1000 * i));
            data.labels.push(Math.round(this.props.balance + (i * p + (10e-9 * i * (i + 1)) / 2)));
        }
        return data;
    }

    getCostData() {
        const data = _.cloneDeep(commonData);
        data.labels = [];
        data.datasets[0].data = [];

        for (let i = 0; i < 10; i++) {
            const supply = this.props.totalSupply * (i + 1);
            data.datasets[0].data.push(105e-9 + 10e-9 * supply);
            data.labels.push(Math.round(supply));
        }
        return data;
    }

    render() {
        const {lang} = this.props;

        return (
            <div className="graphs-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="graph-container green circled">
                            <div className="graph-title">{textPage[lang].tar[0]}</div>
                            <div className="graph">
                                <LineChart
                                    data={this.getCostData()}
                                    options={{
                                        ...costOptions,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="graph-container blue circled">
                            <div className="graph-title">{textPage[lang].count[1]}</div>

                            <div className="graph">
                                <LineChart
                                    data={this.getTokenData()}
                                    options={{
                                        ...tokenOptions,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
        price: state.courses.getEth,
        balance: state.values.other.contractBalance,
        totalSupply: state.values.other.totalSupply,
        lang: state.lang,
    }),
    dispatch => ({
        fetchOthers: () => {
            dispatch(fetchOthers());
        },
        fetchOther: () => {
            dispatch(fetchOther());
        },
        fetchPrice: () => {
            dispatch(fetchPrice());
        },
        fetchCourses: () => {
            dispatch(fetchCourses());
        }
    }))
(Graphs);
