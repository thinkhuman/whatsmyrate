//A tool for calculating your real-world hourly rate for web design/development work. 

/***************
PROCESS OVERVIEW
****************/
//1. Specify target_salary.
//2. Specify associated_costs %.
//3. Calculate new target_salary (target_salary + associated_costs).
//4. Specify time_off (holidays, vacation, sick days), and subtract from total_yearly_hours.
//5. Specify non-billable time, subtract from total hours.
//6. Calculate overhead % ((hourly_rate * overhead)+ hourly_rate)
//7. Specify profit %, and add to hourly_rate


function calculate() {

    var total_yearly_hours = 2080;

    // Get values for ALL elements on screen
    var target_salary    = document.getElementById("target_salary");
    var associated_costs = document.getElementById("associated_costs");
    var timeoff          = document.getElementById("timeoff");
    var nonbillable      = document.getElementById("nonbillable");
    var overhead         = document.getElementById("overhead");
    var profit           = document.getElementById("profit");
    var required_rate    = document.getElementById("required_rate");
    var billable         = document.getElementById("billable");
   
    // Get the user's input from the input elements. 
    var salary    = parseFloat(target_salary.value); // $
    var costs     = parseFloat(associated_costs.value) / 100; //percentage of target_salary
    var vacation  = parseFloat(timeoff.value); //hours
    var freehours = parseFloat(nonbillable.value) /100 ; //percentage of total_yearly_hours
    var ohcosts   = parseFloat(overhead.value); // $
    var extra     = parseFloat(profit.value) / 100; //percentage of total_salary


    // Calculate total salary, which is target_salary plus associated costs.
    var total_salary = (salary * costs) + salary;

    // Calculate billable hours.
    var work_hours = Math.floor(total_yearly_hours - vacation);
    var billable_hours = Math.floor(work_hours - (work_hours * freehours));

    // Calculate rate.
    var base_rate = Math.floor(total_salary / billable_hours);
    var base_overhead = Math.floor((ohcosts / total_salary) * base_rate);
    var base_total = base_rate + base_overhead;
    var base_profit = Math.floor(base_total * extra);
    var rate = Math.floor(base_total+base_profit);

    // Don't display the rate and hours until the rate is a "real" value (!NaN).

    if (isNaN(rate)) {
        required_rate.innerHTML = "$0";
        billable.innerHTML = '0';
    } else {
        required_rate.innerHTML = '$' + rate;
        billable.innerHTML = billable_hours;
      }
}

/* Tooltips: When a user clicks a field, show a description of what the field's for. */

$(document).ready(function(){

    $(".description").hide(); // Hide all the descriptions.
    
    $( "#target_salary" ).focus(function() {
         $(".description").show();
         $(".desc-salary").siblings().hide();
         $(".how-to-use").hide();
         $(".desc-salary").fadeIn();
     });

    $( "#overhead" ).focus(function() {
         $(".description").show();
         $(".desc-overhead").siblings().hide();
         $(".how-to-use").hide();
         $(".desc-overhead").fadeIn();
     });

    $( "#timeoff" ).focus(function() {
        $(".description").show();
        $(".desc-timeoff").siblings().hide();
        $(".how-to-use").hide();
        $(".desc-timeoff").fadeIn();
     });

    $( "#nonbillable" ).focus(function() {
        $(".description").show();
        $(".desc-nonbillable").siblings().hide();
        $(".how-to-use").hide();
        $(".desc-nonbillable").fadeIn();
     });

    $( "#associated_costs" ).focus(function() {
        $(".description").show();
        $(".desc-costs").siblings().hide();
        $(".how-to-use").hide();
        $(".desc-costs").fadeIn();
     });

    $( "#profit" ).focus(function() {
        $(".description").show();
        $(".desc-profit").siblings().hide();
        $(".how-to-use").hide();
        $(".desc-profit").fadeIn();
     });

    $("button").click(function(){
        $(".description").hide();
        $(".how-to-use").show();
    });

});

