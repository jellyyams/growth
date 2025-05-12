function setToolTips(){
    n = svg.selectAll("g"); 
    n.attr("data-tippy-content", (d, i) => {
        let text =  "<b>" + d["Company"] + "</b>"; 
        text += ", founded in " + d["YearFounded"] + "," + d["Country"] + ". Acquired on " + d["Date"] + " for " + d["Cost"];
        return text;
    }); 


    tippy(n.nodes(), {
        allowHTML: true
    }); 

}
