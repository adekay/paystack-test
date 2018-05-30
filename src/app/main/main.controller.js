export class MainController {
  constructor($http, $log, $document) {
    'ngInject';
    this.$http = $http;
    this.$log = $log;
    this.$document = $document;
    this.range = 6;
    this.getSpenders();
  }

  // as requested in the paystack authenticaton documentation, i did not expose the secret key on the client side code 
  // neither did i commit it to the git repository instead i placed it in the environment variable API_KEY. so to get this application to work,
  // you have to add secrect key to the environment variable process.env.API_KEY manually by replacng the "place sercet key here" text 
  // in the .env file at the root of the applicaton with your secret key...in this case the test secret key provided in the email.
  getSpenders() {
    let vm = this;
    vm.$http({
      url: 'https://studio-api.paystack.co/insights/spenders',
      method: 'GET',
      params: {
        'from': new Date('January 1, 2017')
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + process.env.API_KEY
      }
    }).then(function (result) {
      vm.customers = result.data.data.sort((a, b) => {
        return b.total_transaction_amount - a.total_transaction_amount
      });

      vm.total = vm.customers.reduce((a, b) => {
        return a + b.total_transaction_amount;
      }, 0);
      vm.setTag(vm.range);
    }).catch((error) => {
      vm.$log.error('XHR Failed.\n' + angular.toJson(error.data, true));

      angular.element(vm.$document[0].body.querySelector('.loader-gif')).css({
        display: `none`
      });
      angular.element(vm.$document[0].body.querySelector('.card'))
      .text(`as requested in the paystack authenticaton documentation, i did not expose the secret key on the client side code 
      neither did i commit it to the git repository instead i placed it in the environment variable API_KEY. so to get this application to work,
      you have to add secrect key to the environment variable process.env.API_KEY manually by replacng the "place sercet key here" text 
      in the .env file at the root of the applicaton with your secret key...in this case the test secret key provided in the email`);
    });
  }

  setTag(value) {
    let vm = this
    let index = value - 1;

    // code postitioning the numeber above the slider button
    let sliderPercentagePosition = index * 100 / 11;
    let tagPercentageDiff = 20 / 100 * sliderPercentagePosition;
    angular.element(vm.$document[0].body.querySelector('.tag')).text(value).css({
      left: `calc(${sliderPercentagePosition}% - ${tagPercentageDiff}px)`
    });

    // calculation of the percentage revenue based on slider postion
    let percentageRevenue = 0;
    for (let i = 0; i <= index; i++) {
      percentageRevenue = percentageRevenue + this.customers[i].total_transaction_amount;

      if (i == index) {
        percentageRevenue = percentageRevenue * (100 / vm.total);
      }
    }

    // changing displayed text based on slider value and percentage revenue calculated
    if (value == 1) {
      angular.element(vm.$document[0].body.querySelector('.paying-count')).text('');
      angular.element(vm.$document[0].body.querySelector('.pluralize')).text('');
    } else {
      angular.element(vm.$document[0].body.querySelector('.paying-count')).text(value);
      angular.element(vm.$document[0].body.querySelector('.pluralize')).text('s');
    }
    // I wanted to round the percentage to 1 decimal places instead of zero decimal places as shown in the GIF example image because of the values that are...
    // the same when rounded to 0 decimal places for clarity but decided to keep it exactly as in the GIF
    angular.element(vm.$document[0].body.querySelector('.revenue-percentage')).text(Math.round(percentageRevenue, 0));

    angular.element(vm.$document[0].body.querySelector('.loader-gif')).css({
      display: `none`
    });

    angular.element(vm.$document[0].body.querySelector('.content')).css({
      display: `block`
    });
  }
}
