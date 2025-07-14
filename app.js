function calculate() {
    // Game base values (constants)
    let flower = parseFloat(document.getElementById('flower').value);
    let woodPrice = parseFloat(document.getElementById('woodPrice').value);
    let stonePrice = parseFloat(document.getElementById('stonePrice').value);
    let ironPrice = parseFloat(document.getElementById('ironPrice').value);
    let goldPrice = parseFloat(document.getElementById('goldPrice').value);
    let crimstonePrice = parseFloat(document.getElementById('crimstonePrice').value);

    // number of nodes
    let stone_nodes = parseFloat(document.getElementById('stoneNodes').value);
    let iron_nodes = parseFloat(document.getElementById('ironNodes').value);
    let gold_nodes = parseFloat(document.getElementById('goldNodes').value);
    let crimstone_nodes = parseFloat(document.getElementById('crimstoneNodes').value);

    // base coin costs
    let pickaxe_coin = 20;
    let stone_pickaxe_coin = 20;
    let iron_pickaxe_coin = 80;
    let gold_pickaxe_coin = 100;

    // adjusting axes costs according to skills
    if (document.getElementById("frugalMiner").checked) {
        pickaxe_coin *= 0.8;
        stone_pickaxe_coin *= 0.8;
        iron_pickaxe_coin *= 0.8;
        gold_pickaxe_coin *= 0.8;
    }

    // updated axes cost
    let Pickaxe = (pickaxe_coin/flower) + woodPrice*3;
    let Stone_Pickaxe = (stone_pickaxe_coin/flower) + woodPrice*3 + stonePrice*5;
    let Iron_Pickaxe = (iron_pickaxe_coin/flower) + woodPrice*3 + ironPrice*5;
    let Gold_Pickaxe = (gold_pickaxe_coin/flower) + woodPrice*3 + goldPrice*5;

    // base mineral yields
    let stone_yield = 1.2;
    let iron_yield = 1.2;
    let gold_yield = 1.2;
    let crimstone_yield = 1.4;

    // base mineral recovery times
    let stone_time = 14400;
    let iron_time = 28800;
    let gold_time = 86400;
    let crimstone_time = 86400;


    // updated with skills
    if (document.getElementById("rockNRoll").checked) stone_yield += 0.1;
    if (document.getElementById("ironBumpkin").checked) iron_yield += 0.1;
    if (document.getElementById("speedMiner").checked) stone_time *= 0.8;
    if (document.getElementById("ironHustle").checked) iron_time *= 0.7;
    if (document.getElementById("rockyFavor").checked) {
        stone_yield += 1;
        iron_yield -= 0.5;
    }
    if (document.getElementById("fireKissed").checked) crimstone_yield += 0.2;
    if (document.getElementById("midasSprint").checked) gold_time *= 0.9;
    if (document.getElementById("ferrousFavour").checked) {
        iron_yield += 1;
        stone_yield -= 0.5;
    }
    if (document.getElementById("goldenTouch").checked) gold_yield += 0.5;
    if (document.getElementById("firesideAlchemist").checked) crimstone_time *= 0.85;
    if (document.getElementById("midasRush").checked) gold_time *= 0.8;


    // updated with NFTs
    if (document.getElementById("crimstoneArmor").checked) crimstone_yield += 0.1;
    if (document.getElementById("tunnelMole").checked) stone_yield += 0.25;
    if (document.getElementById("rockyTheMole").checked) iron_yield += 0.25;
    if (document.getElementById("crimstoneAmulet").checked) crimstone_time *= 0.8;
    if (document.getElementById("crimsonCarp").checked) crimstone_yield += 0.05;
    if (document.getElementById("nugget").checked) gold_yield += 0.25;
    if (document.getElementById("ironIdol").checked) iron_yield += 1;


    // productions costs , yields, and profits
    let stone_cycles = 864000/stone_time;
    let iron_cycles = 86400/iron_time;
    let gold_cycles = 86400/gold_time;
    let crimstone_cycles = 86400/crimstone_time;

    let stone_produced = stone_nodes * stone_yield * stone_cycles;
    let stone_cost = stone_nodes * stone_cycles * Pickaxe;
    let stone_profit = (stonePrice*stone_produced) - stone_cost;

    let iron_produced = iron_nodes * iron_yield * iron_cycles;
    let iron_cost = iron_nodes * iron_cycles * Stone_Pickaxe;
    let iron_profit = (ironPrice*iron_produced) - iron_cost;

    let gold_produced = gold_nodes * gold_yield * gold_cycles;
    let gold_cost = gold_nodes * gold_cycles * Iron_Pickaxe;
    let gold_profit = (gold_produced*goldPrice) - gold_cost;

    let crimstone_produced = crimstone_nodes * crimstone_yield * crimstone_cycles;
    let crimstone_cost = crimstone_nodes * crimstone_cycles * Gold_Pickaxe;
    let crimstone_profit = (crimstone_produced*crimstonePrice) - crimstone_cost;


    // Final Output
    let output = `
        Stone
        ----------------------------------
        Total Production : ${stone_produced.toFixed(3)} stones
        Total Cost: ${stone_cost.toFixed(3)} FLOWER
        Total Profit: ${stone_profit.toFixed(3)} FLOWER

        Iron
        ----------------------------------
        Total Production : ${iron_produced.toFixed(3)} iron
        Total Cost: ${iron_cost.toFixed(3)} FLOWER
        Total Profit: ${iron_profit.toFixed(3)} FLOWER

        Gold
        ----------------------------------
        Total Production : ${gold_produced.toFixed(3)} gold
        Total Cost: ${gold_cost.toFixed(3)} FLOWER
        Total Profit: ${gold_profit.toFixed(3)} FLOWER

        Crimstone
        ----------------------------------
        Total Production : ${crimstone_produced} iron
        Total Cost: ${crimstone_cost} FLOWER
        Total Profit: ${crimstone_profit} FLOWER`;
    document.getElementById("result").innerText = output;
}