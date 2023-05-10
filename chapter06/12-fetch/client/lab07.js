var countries_data;
var employees_data;

const createEmployeeRow = (emp) => {
  let tr = document.createElement("tr");

  let td_id = document.createElement("td");
  td_id.textContent = emp.id;

  let td_fullname = document.createElement("td");
  td_fullname.textContent = `${emp.name} ${emp.lastname}`;

  let td_address = document.createElement("td");
  td_address.textContent = `${emp.address.nb} ${emp.address.street}, ${emp.address.city}, ${emp.address.country}`;

  tr.appendChild(td_id);
  tr.appendChild(td_fullname);
  tr.appendChild(td_address);

  return tr;
};

const applyCSS = function () {
  // Add the grey background to even table rows
  const nodes = document.querySelectorAll("tr:nth-child(2n)");
  for( n of nodes ) {
    n.classList.add("grey");
  }

  // Add border to tables, tds and ths
  const nodes2 = document.querySelectorAll("table, td, th");
  for( n of nodes2 ) {
    n.classList.add("border");
  }

};

const populateCitiesSelectionList = ( cities ) => {
  let cities_selector = document.getElementById("cities_selector");
  cities_selector.innerHTML = "";
  // create an additional element "all"
  let element = document.createElement("option");
  element.value = "all";
  element.textContent = "all";
  cities_selector.appendChild(element);

  for(city of cities){
        let element = document.createElement("option");
        element.value = city;
        element.textContent = city;
        cities_selector.appendChild(element);

  }

};

const getSelectedCountryCities = () => {
  if( !countries_data ) return;
  for( country of countries_data ){
    if( country.name == getSelectedRadio("countries_radio") ){
      return country.cities;
    }
  }
}

const handleRadioChange = () => {
  populateCitiesSelectionList( getSelectedCountryCities() );

}

const populateCountriesRadio = ( countries ) => {
  let countries_radio = document.getElementById("countries_radio");
  countries_radio.innerHTML = "";

  for(c of countries){
    let input = document.createElement("input");
    input.type = "radio";
    input.id = c.name;
    input.name = "selected_country";
    input.value = c.name;
    //input.addEventListener("click", handleRadioChange());
    let label = document.createElement("label");
    label.for = c.name;
    label.textContent = c.name; 
    let br = document.createElement("br");
    countries_radio.appendChild(input);
    countries_radio.appendChild(label);
    countries_radio.appendChild(br);
  }
}

const getSelectedRadio = (id) => {
  return document.querySelector('input[name="selected_country"]:checked').value;
}

const setChangeEventListeners = () => {
  let countries_radio_list = document.querySelectorAll("#countries_radio input");
  for( r of countries_radio_list ){
    r.addEventListener("change", handleRadioChange);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{

  // Apply CSS style
  applyCSS();

})

const populateEmployeesTable = ( data ) => {
  let country = getSelectedRadio("countries_radio");
  let city = document.getElementById("cities_selector").value;
  employee_table_body = document.getElementById("employee_table_body");
  employee_table_body.innerHTML = "";
  for( emp of data ){
    if( !country ){
      employee_table_body.appendChild( createEmployeeRow( emp ) );
    } else if( country == emp.address.country ){
      if( !city || (city === "all") )
        employee_table_body.appendChild( createEmployeeRow( emp ) );
      else if( emp.address.city === city )
        employee_table_body.appendChild( createEmployeeRow( emp ) );
    }

  }

  applyCSS();
}

// execute the search by city
const run = () => {
  let employees_promise = fetch('http://localhost:3000/employees')
  employees_promise.then(response => response.json())
                  .then( data => {
                    populateEmployeesTable(data);
                  })
                  .catch(reject => {
                    console.log("Could not load employees data..." + reject);
                  });
  
};