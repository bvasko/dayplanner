$( document ).ready(function() {
  // display current timestamp
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm a"));
  const hoursInDay = 9;
  const startTime = 8;
  /**
   * stub functions to get/set localStorage
   */
  const saveInput = () => {};
  const displayInput = () => {};
  
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
  const renderRow = (h, color) => {
    return `
      <div class="row">
        <div class="col-2">${h}</div>
        <div class="col-10 time-block ${color}">
          <textarea placeholder="create entry" /><button class="saveBtn">Save</button>
        </div>
      </div>
    `;
  };
  /**
   * 
   * render all the rows
   */
  const renderRows = () => {
    let container = $(".container");
    for (let i = 0; i < hoursInDay; i++) {
      const rowHour = startTime + i;
      /* pass in hour */
      const rowColor = getColorCode(rowHour);
      const r = renderRow(rowHour, rowColor, i);
      container.append(r);
    }
  };
  renderRows();
});
/**
 * color code for past: #eee, present: blue, future: greenish
 */