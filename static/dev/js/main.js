import "../styles/style.scss";
import $ from "jquery";

$.ajax("/api/issues").then((resp)=>{
  resp.forEach((issue, index) => {
    let status = "";
    switch(issue.status){
    case 0:
      status = "open";
      break;
    case 1:
      status = "pending";
      break;
    case 2:
      status = "closed";
      break;
    }
    const el = $(`
    <tr>
      <td scope="row">${index}</td>
      <td>${issue.title}</td>
      <td>${issue.description}</td>
      <td>${status}</td>
    </tr>
    `);
    $("#list").append(el);
  });

});