const assert = require('assert');
var request = require('../../HTTPRequests/Get');
const { Given, When, Then } = require('cucumber');


function isItFriday(today) {
    return 'Nope';
}

Given('todas is Sunday', () => {
    //Here will add functionality to retrieve valid data for automation
    this.today = 'Sunday';    
});

Given('today is Friday', ()=> {
    this.today = 'Friday';
  });

When('I ask whether it\'s Friday yet', () => {
    //Functionality to make requests
    var templateParams = {
        tParam1:"valueTParam1",
        tParam2:"valueTParam2"
    }
    var queryParams={
        qParam1:"valueQParam1",
        qParam2:"valueQParam2"        
    }

    request.get(templateParams,queryParams);
    this.actualAnswer = isItFriday(this.today);    
});

Then('I should be told {string}', (expectedAnswer) => {
    //Assertions to validate retrieved data 
    assert.equal(this.actualAnswer,expectedAnswer);
});