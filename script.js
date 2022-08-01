const start = async ()=>{
    let myTable = document.querySelector('#table');

    const response = await fetch("https://grappe.io/data/api/62e10a665e5d5200115a5410-http-check-DP");
    const serverHttpsStatus = await response.json();
    //console.log(serverHttpsStatus);
    
    const result = serverHttpsStatus.reduce((acc, d) => {
      const found = acc.find(a => a.projet === d.projet);
      //const value = { name: d.name, val: d.value };
      const value = { http: d.http, service: d.service }; // the element in service property
      if (!found) {
        //acc.push(...value);
        acc.push({projet:d.projet, service: [value]}) // not found, so need to add service property
      }
      else {
        //acc.push({ name: d.name, service: [{ value: d.value }, { count: d.count }] });
        found.service.push(value) // if found, that means service property exists, so just push new element to found.data.
      }
      return acc;
    }, []);

    let headers = ['Project', 'Service 1', 'Service 2', 'service 3']
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        let header= document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    })
    
    table.appendChild(headerRow);

    result.forEach(server => {
        let row = document.createElement('tr');

        Object.values(server).forEach(v => {
            if ( typeof v === 'object' && v !== null) {
                console.log(v);
                v.forEach(element => {
                    let cell= document.createElement('td');
                    if ( element.http === 200) {
                        cell.style.color="#207C17";
                    } else { cell.style.color="#E51919"; }
                    let textNode = document.createTextNode(element.service);
                    cell.appendChild(textNode);
                    row.appendChild(cell);
                });
            } else{
                let cell= document.createElement('td');
                let textNode = document.createTextNode(v);
                cell.appendChild(textNode);
                row.appendChild(cell);
            }
        })

        table.appendChild(row);
    })

    myTable.appendChild(table);
  }
  
  document.addEventListener('readystatechange', () => {
    if(document.readyState==='complete'){
      start();
    }
   });
   