function setToolTips(){
    n = svg.selectAll("g").filter(function(d){
        return d["Company"] != "Microsoft Corp";
    }); 

    //remove all previous instances of tippy
    [...document.querySelectorAll('*')].forEach(node => {
        if (node._tippy) {
            node._tippy.destroy();
        }
    });

    n.attr("data-tippy-content", (d, i) => {
        if(d["Company"] != "Microsoft Corp"){
            let text =  "<b>" + d["Company"] + "</b>"; 
            text += ", founded in " + d["YearFounded"] + ", " + d["Country"] + ". Acquired on " + d["Date"] + " for " + d["Cost"];
            return text;
        }
        
    })

    tippy(n.nodes(), {
        allowHTML: true
    }); 

}
