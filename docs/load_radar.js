const quadrantarr = ["languages and framework", "tools", "platforms and services","techniques"];
const ringarr = ["Adopt", "Trial", "Assess", "Hold"];
const movedarr = ["no", "yes"];
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  let out = [];
  for (let j=0; j< rows.length; j++) {
    let rowObject = {};
    let bits = rows[j].split(delimiter);
    for(let i =0; i < headers.length; i++) {
      rowObject[headers[i]] = bits[i];
    }
    out.push(rowObject);
  }
  return out;
}

function toEntry(array) {
  let entry = []
  for (let k=0; k<array.length; k++){
    let entryObject = {
    quadrant: quadrantarr.indexOf(array[k].quadrant),
    ring: ringarr.indexOf(array[k].ring),
    name: array[k].name,
    link: array[k].link,
    active: array[k].active,
    moved: movedarr.indexOf(array[k].moved)
    };
    entry.push(entryObject);
  }
  return entry;
}

function draw_radar(radar_entries) {
radar_visualization({
  svg_id: "radar",
  width: 1450,
  height: 1000,
  colors: {
    background: "#fff",
    grid: "#bbb",
    inactive: "#ddd",
  },
  title: "ANZx Platform Cloud Infra Tech Radar",
  quadrants: [
    { name: "languages and framework" },
    { name: "tools" },
    { name: "platforms and services" },
    { name: "techniques" },
  ],
  rings: [
    { name: "Adopt", color: "#93c47d" },
    { name: "Trial", color: "#93d2c2" },
    { name: "Assess", color: "#fbdb84" },
    { name: "Hold", color: "#efafa9" },
  ],
  print_layout: true,

  entries: radar_entries
});
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const data = toEntry(csvToArray(text));
    draw_radar(data);
    //document.write(JSON.stringify(data));
  };
  reader.readAsText(input);
});