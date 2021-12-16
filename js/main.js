$( document ).ready(function() {
  // display current timestamp
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm a"));
  const hoursInDay = 9;
  const startTime = 8;
  /**
   * stub functions to get/set localStorage
   */
  const saveInput = (val, index) => {
    let notesArray = JSON.parse(localStorage.getItem("notes")) || [];
    notesArray[Number(index)] = val;
    localStorage.setItem("notes", JSON.stringify(notesArray));
  };
  const displayInput = () => {};
  
  /**
   * Save note on button click
   */
   $('.container').on("click", ".saveBtn", function (event) { 
     const container = $(event.target.parentNode);
     const index = container.attr("data-index");
     const note = container.children("textarea")[0].value;
     saveInput(note, index);
   });

  /**
   * 
   * @param {number} hour
   * @returns string
   */
  const getColorCode = (hour) => {
    const t = new Date();
    return (t.getHours() === hour) ? 'present' : (hour < t.getHours()) ? 'past' : 'future';
  };

  /**
   * 
   * return row element to be rendered
   */
  const renderRow = (h, color, i, val) => {
    return `
      <div class="row">
        <div class="hour col-2">${moment().set('hour', h).set('minute', 00).format("h:mm a")}</div>
        <div data-index="${i}" class="col-10 time-block ${color}"><textarea placeholder="create entry">${val}</textarea><button class="saveBtn">Save</button></div>
      </div>
    `;
  };
  /**
   * 
   * render all the rows
   */
  const renderRows = () => {
    let container = $(".container");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    for (let i = 0; i < hoursInDay; i++) {
      const rowHour = startTime + i;
      /* pass in hour */
      const rowColor = getColorCode(rowHour);
      const val = notes[i] || '';
      const r = renderRow(rowHour, rowColor, i, val);
      container.append(r);
    }
  };
  renderRows();
});
/**
 * color code for past: #eee, present: blue, future: greenish
 */