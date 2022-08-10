const start = async ()=>{
    let myListe = document.querySelector('#liste');

    const response = await fetch("https://grappe.io/data/api/62f0d632d0188300341c62c8-http-check-DP");
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

    let liste = document.createElement('ul');

    result.forEach(server => {
        let row = document.createElement('ul');

        Object.values(server).forEach(v => {
            if ( typeof v === 'object' && v !== null) {
                v.forEach(element => {
                    let cell= document.createElement('ul');
                    if ( element.http === 200) {
                        cell.style.color="#207C17";
                    } else { cell.style.color="#E51919"; }
                    let textNode = document.createTextNode(element.service);
                    cell.appendChild(textNode);
                    row.appendChild(cell);
                });
            } else{
                let cell= document.createElement('li');
                let textNode = document.createTextNode(v);
                cell.appendChild(textNode);
                row.appendChild(cell);
            }
        })

        liste.appendChild(row);
    })

    myListe.appendChild(liste);
  }
  
  document.addEventListener('readystatechange', () => {
    if(document.readyState==='complete'){
      start();
    }
   });
   
