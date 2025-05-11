function processData(aSet, cSet, yearStart, yearEnd){
    //process csv data into arrays that count number of companies acquired and founded each year 

    let agroups = d3.rollup(aSet, 
        (d) => d.length,
        function(d) {return +d["Year"]}
    )//group companies by year acquired 

    let cgroups = d3.rollup(cSet, 
        (d) => d.length,
        function(d) {return +d["YearFounded"]}
    ) //group companies by year founded

    let ayears = d3.map(agroups, function(d){return +d[0]});
    let cyears = d3.map(cgroups, function(d){return +d[0]});

    for(i = yearStart; i <= yearEnd; i++){
        if(!ayears.includes(i)){
            agroups.set(i, 0);
        }
        if(!cyears.includes(i)){
            cgroups.set(i, 0);
        }
    } //add in rows for years missing from data 

    //filter out years that aren't within start and end range 
    agroups = d3.filter(agroups, function(d){
        return d[0]>= yearStart && d[0] <= yearEnd;
    });
    cgroups = d3.filter(cgroups, function(d){
        return d[0]>= yearStart && d[0] <= yearEnd;
    });

    //sort data by year 
    const newMapa = Array.from(agroups).sort((a, b) => a[0] - b[0]);
    const sortedMapa = new Map(newMapa);
    const newMapc = Array.from(cgroups).sort((a, b) => a[0] - b[0]);
    const sortedMapc = new Map(newMapc);

    return [sortedMapa, sortedMapc];
}

function combineData(aSet, cSet){
    for(var i = 0; i < cSet.length; i++){
        let aData = aSet.filter(function(d){
            return d["target"] == cSet[i]["Company"]
        })
        if(aData.length > 0){
            cSet[i]["Date"] = aData[0]["Date"]
            cSet[i]["Cost"] = aData[0]["Cost"]
        } else {
            cSet[i]["Date"] = "n/a"
            cSet[i]["Cost"] = "n/a"
        }
        
    }

    return cSet; 

}