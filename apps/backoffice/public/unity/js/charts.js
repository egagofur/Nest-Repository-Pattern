// colors
var blue = '#A0D7E7';
var blueLight = '#0e97b5';
var purple = '#6C5DD3';
var white = '#ffffff';
// var blueOpacity = '#e6efff';
// var blueLight = '#50B5FF';
var pink = '#FFB7F5';
// var orangeOpacity = '#fff5ed';
var yellow = '#FFCE73';
var green = '#7FBA7A';
var red = '#FF754C';
// var greenOpacity = '#ecfbf5';
var gray = '#808191';
var grayOpacity = '#f2f2f2';
// var grayLight = '#E2E2EA';
var borderColor = '#E4E4E4';
// var text = "#171725";

// charts
Apex.chart = {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    fontWeight: 500,
    foreColor: gray,
};

// chart earning
(function () {
    var options = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan'],
        series: [
            {
                // name: 'Marketing Sales',
                data: [23, 13, 28, 20],
            },
            {
                // name: 'Cases Sale',
                data: [21, 17, 43, 20],
            },
        ],
        colors: [blue, purple],
        chart: {
            height: '100%',
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                left: 15,
                right: 0,
                bottom: 0,
            },
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                show: false,
            },
        },
    };

    var chart = document.querySelector('#chart-earning');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart affiliate impressions
(function () {
    var options = {
        labels: ['Graphics', 'Theme', 'Template'],
        series: [
            {
                name: '',
                data: [95, 66, 44],
            },
            {
                name: '',
                data: [72, 48, 38],
            },
        ],
        colors: [purple, blue],
        chart: {
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 0,
                left: 15,
                right: 0,
                bottom: 0,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
        },
        xaxis: {
            axisBorder: {
                show: false,
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    var chart = document.querySelector('#chart-affiliate-impressions');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart active users
(function () {
    var options = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        series: [
            {
                name: 'Active users',
                data: [442, 380, 275, 430, 509, 463, 407, 533, 470],
            },
        ],
        colors: [purple],
        chart: {
            height: '100%',
            type: 'line',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        stroke: {
            width: 2,
            curve: 'smooth',
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
    };

    var chart = document.querySelector('#chart-active-users');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart users counter
(function () {
    var options = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul'],
        series: [
            {
                name: 'New users',
                data: [400, 380, 240, 280, 390, 330, 175],
            },
            {
                name: 'Users',
                data: [100, 0, 0, 0, 60, 0, 20],
            },
        ],
        colors: [white, borderColor],
        chart: {
            height: '100%',
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                left: 10,
                right: 0,
                bottom: 0,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                endingShape: 'rounded',
                columnWidth: '10%',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            x: {
                show: false,
            },
            shared: true,
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            axisBorder: {
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
            labels: {
                style: {
                    colors: white,
                },
            },
        },
    };

    var chart = document.querySelector('#chart-users-counter');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart users blue color
(function () {
    var options = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                name: '',
                data: [35, 66, 34, 56, 18],
            },
        ],
        colors: [blue],
        chart: {
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
        },
        xaxis: {
            axisBorder: {
                show: false,
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    var chart = document.querySelector('#chart-users-blue');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart users purple color
(function () {
    var options = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                name: '',
                data: [25, 46, 64, 56, 28],
            },
        ],
        colors: [purple],
        chart: {
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
        },
        xaxis: {
            axisBorder: {
                show: false,
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    var chart = document.querySelector('#chart-users-purple');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart income
(function () {
    var options = {
        labels: ['Oct', 'Mar', 'Aug'],
        series: [
            {
                name: '',
                data: [95, 66, 44],
            },
            {
                name: '',
                data: [72, 48, 38],
            },
        ],
        colors: [purple, blue],
        chart: {
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                left: 15,
                right: 0,
                bottom: 0,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
        },
        xaxis: {
            axisBorder: {
                show: false,
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    var chart = document.querySelector('#chart-income');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart circle purple
(function () {
    var options = {
        series: [40],
        chart: {
            height: '100%',
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '65%',
                },
                track: {
                    background: grayOpacity,
                    margin: 0,
                },
                dataLabels: {
                    show: false,
                },
            },
        },
        fill: {
            colors: purple,
        },
    };

    var chart = document.querySelector('#chart-circle-purple');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart circle green
(function () {
    var options = {
        series: [62],
        chart: {
            height: '100%',
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '65%',
                },
                track: {
                    background: grayOpacity,
                    margin: 0,
                },
                dataLabels: {
                    show: false,
                },
            },
        },
        fill: {
            colors: green,
        },
    };

    var chart = document.querySelector('#chart-circle-green');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart circle red
(function () {
    var options = {
        series: [75],
        chart: {
            height: '100%',
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '65%',
                },
                track: {
                    background: grayOpacity,
                    margin: 0,
                },
                dataLabels: {
                    show: false,
                },
            },
        },
        fill: {
            colors: red,
        },
    };

    var chart = document.querySelector('#chart-circle-red');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart circle yellow
(function () {
    var options = {
        series: [35],
        chart: {
            height: '100%',
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '65%',
                },
                track: {
                    background: grayOpacity,
                    margin: 0,
                },
                dataLabels: {
                    show: false,
                },
            },
        },
        fill: {
            colors: yellow,
        },
    };

    var chart = document.querySelector('#chart-circle-yellow');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart tabs
(function () {
    var options = {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        series: [
            {
                name: '',
                data: [25, 46, 99, 61, 75, 82, 43],
            },
        ],
        colors: [blue],
        chart: {
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            shared: true,
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
        xaxis: {
            axisBorder: {
                show: false,
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    var chart = document.querySelector('#chart-tabs');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart report
(function () {
    var options = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
        series: [
            {
                name: 'New users',
                data: [60, 25, 44, 37, 28],
            },
            {
                name: 'Users',
                data: [40, 16, 38, 30, 25],
            },
        ],
        colors: [purple, blue],
        chart: {
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
            padding: {
                top: 0,
                left: 10,
                right: 0,
                bottom: 0,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
        stroke: {
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            x: {
                show: false,
            },
            shared: true,
        },
        xaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            axisBorder: {
                color: borderColor,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    var chart = document.querySelector('#chart-report');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();

// chart earnings by item
(function () {
    var options = {
        series: [22, 37, 41],
        colors: [purple, pink, borderColor],
        chart: {
            height: '100%',
            type: 'donut',
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '71%',
                    polygons: {
                        strokeWidth: 0,
                    },
                },
                expandOnClick: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
    };

    var chart = document.querySelector('#chart-earnings-by-item');
    if (chart != null) {
        new ApexCharts(chart, options).render();
    }
})();
